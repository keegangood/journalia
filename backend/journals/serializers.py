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

    children = JournalItemChildrenField(many=True, read_only=True)

    def to_representation(self, instance):

        content_object = instance.content_object
        context={'children':[JournalItemDetailSerializer(child).data for child in instance.children.all()]}

        if isinstance(content_object, Task):
            serializer = TaskDetailSerializer(instance = content_object, context=context)
            serializer.item_type = 'T'
            
        elif isinstance(content_object, Note):
            serializer = NoteDetailSerializer(content_object, context=context)
            serializer.item_type = 'N'

        elif isinstance(content_object, Event):
            serializer = EventDetailSerializer(content_object, context=context)
            serializer.item_type = 'N'

        # make a copy of the immutable serializer data and 
        # add the children from the context dictonary
        serializer_data = serializer.data.copy()
        serializer_data |= serializer.context

        return serializer_data

        
    class Meta:
        model = JournalItem
        fields='__all__'


