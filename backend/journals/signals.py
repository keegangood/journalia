from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
from notes.models import Note
from tasks.models import Task
from events.models import Event

from .models import JournalItem

@receiver(pre_delete, sender=JournalItem)
def delete_content_object(sender, instance, **kwargs):
    '''
    Before delteting a JournalItem:
    - delete all of its children and their content_objects 
    - delete its content_object
    '''
    
    print(instance.content_object)

    [child.delete() for child in instance.children.all()]
    
    if instance.content_object:
        instance.content_object.delete()
