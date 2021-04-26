from django.db import models
from django.utils.translation import ugettext_lazy as _

from notes.models import Note

class Task(Note):
    completed = models.BooleanField(_('completed'), default=False)
    deadline = models.DateTimeField(_('deadline'), blank=True, null=True)

    def __str__(self):
        return f'{self.title}'