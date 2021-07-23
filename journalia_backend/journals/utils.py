from datetime import date

from events.models import Event
from events.serializers import EventCreateSerializer
from events.serializers import EventDetailSerializer

from tasks.models import Task
from tasks.serializers import TaskCreateSerializer
from tasks.serializers import TaskDetailSerializer

from notes.models import Note
from notes.serializers import NoteCreateSerializer
from notes.serializers import NoteDetailSerializer

from .serializers import JournalItemDetailSerializer
from .models import JournalItem
from django.contrib.contenttypes.models import ContentType


def model_from_item_type(item_type):
    '''Return the appropriate model for a given item_type'''

    models = {
        'T': Task,
        'N': Note,
        'E': Event
    }

    return models[item_type]


def serializer_from_item_type(item_type, serializer_type):
    '''Return a DetailSerializer or CreateSerializer for the given item type'''

    serializers = {
        'T': {
            'create': TaskCreateSerializer,
            'detail': TaskDetailSerializer
        },
        'N': {
            'create': NoteCreateSerializer,
            'detail': NoteDetailSerializer
        },
        'E': {
            'create': EventCreateSerializer,
            'detail': EventDetailSerializer
        }
    }

    return serializers[item_type][serializer_type]


def get_parent_object(item_type, item_id, owner):
    '''Locate a JournalItem's parent object in the database'''
    parent_model = model_from_item_type(item_type)
    parent_ct = ContentType.objects.get_for_model(parent_model)
    parent_object = JournalItem.objects.filter(
        content_type=parent_ct, object_id=item_id, owner=owner).first()

    return parent_object


def parent_adopts_child(parent, child):
    '''Create parent/child relationship between two JournalItems'''
    parent.add_child(child, save=True)
    child.set_parent(parent, save=True)

    return


def string_to_date(date_string):
    '''split a YYYY-MM-DD date string into sections and return a datetime date object for that date'''
    date_parts = date_string.split('=')[1].split('-')
    date_parts = [int(part) for part in date_parts]

    year, month, day = date_parts

    date_obj = date(year=year, month=month, day=day)

    return date_obj