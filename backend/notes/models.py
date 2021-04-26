from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.fields import GenericRelation 
from journals.models import JournalItem

class Note(models.Model):
    title = models.CharField(_('title'), max_length=1000)
    
    # def _date_created(self):
    #     return self.date_created.strftime("%Y/%m/%d - %H:%M:%S")

    def __str__(self):
        return f'{self.id}. {self.title}'

