from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

class JournalItem(models.Model):
    '''Generic JournalItem class for setting up GenericRelations between models'''
    NOTE = 'N'
    TASK = 'T'
    EVENT = 'E'

    ITEM_TYPES = (
        (NOTE, 'Note'),
        (TASK, 'Task'),
        (EVENT, 'Event'),
    )


    item_type = models.CharField(max_length=1, choices=ITEM_TYPES)
    owner = models.ForeignKey(get_user_model(), verbose_name=_('owner'), on_delete=models.CASCADE)
    
    is_important = models.BooleanField(_('important'), default=False)
    is_research = models.BooleanField(_('research'), default=False)
    is_good_idea = models.BooleanField(_('good idea'), default=False)
    date_created = models.DateTimeField(_('date created'), blank=True, null=True)

    last_modified = models.DateTimeField(_('date edited'), blank=True, null=True)

    parent_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='parent_item', null=True)
    parent_id = models.PositiveIntegerField(null=True)
    parent_object = GenericForeignKey('parent_type', 'parent_id')
    
    child_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='child_item', null=True)
    child_id = models.PositiveIntegerField(null=True)
    children = GenericRelation(
        'self',
        content_type_field='child_type',
        object_id_field='child_id',
        related_query_name='parent'
    )

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name="object_item")
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f'{self.owner.username} - {[item[1] for item in self.ITEM_TYPES if item[0]==self.item_type][0]}: {self.content_object.title}'

    class Meta:
        ordering = ['date_created']