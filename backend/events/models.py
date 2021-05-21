from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.fields import GenericRelation 
from journals.models import JournalItem

class Event(models.Model):
    title = models.CharField(_('title'), max_length=1000)
    
    # children = GenericRelation('journals.JournalItem', content_type_field='child_type', object_id_field='child_id')

    def __str__(self):
        return f'Event #{self.id}. {self.title}'

