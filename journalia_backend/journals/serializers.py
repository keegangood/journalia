from rest_framework.serializers import RelatedField, ModelSerializer, SerializerMethodField

from .models import JournalItem

from notes.models import Note
from notes.serializers import NoteDetailSerializer

from tasks.models import Task
from tasks.serializers import TaskDetailSerializer

from events.models import Event
from events.serializers import EventDetailSerializer



class JournalItemChildrenField(RelatedField):
    def to_representation(self, instance):

        return instance.content_object
    
    class Meta:
        model = JournalItem
    

class JournalItemDetailSerializer(ModelSerializer):
    class Meta:
        exclude = ['item_type',]
        
    children = JournalItemChildrenField(many=True, read_only=True)

    def to_representation(self, instance):
        fields = [
            'id',
            'is_important',
            'is_research',
            'is_good_idea',
            'data_created',
            'last_modified',
            'object_id'
        ]

        # initialize the serializer with the current self instance
        data = super(JournalItemDetailSerializer, self).to_representation(instance)

        # filter out unnecessary items
        data = {key:value for key,value in data.items() if key in fields}

        # serialize all the children of the current item
        children ={
            'children':[JournalItemDetailSerializer(child).data for child in instance.children.all()],
        }

        # serialize the content_object
        content_object = instance.content_object
        if isinstance(content_object, Task):
            content_object = TaskDetailSerializer(instance = content_object)
            
        elif isinstance(content_object, Note):
            content_object = NoteDetailSerializer(instance=content_object)

        elif isinstance(content_object, Event):
            content_object = EventDetailSerializer(instance=content_object)

        # add the children and the content_object items to the JournalItem serializer
        if content_object is not None:
            # make a copy of the immutable serializer data and 
            # add the children from the context dictonary
            data.update(content_object.data.copy())

            # only one level of nesting allowed at the moment
            # if the instance is a child, it can't have children
            if not instance.is_child:
                data.update(children)

        return data
        
    class Meta:
        model = JournalItem
        fields='__all__'


