import requests
import random
import datetime

from faker import Faker

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

from events.models import Event
from events.serializers import EventCreateSerializer
from events.serializers import EventDetailSerializer

from tasks.models import Task
from tasks.serializers import TaskCreateSerializer
from tasks.serializers import TaskDetailSerializer

from notes.models import Note
from notes.serializers import NoteCreateSerializer
from notes.serializers import NoteDetailSerializer

from journals.serializers import JournalItemDetailSerializer
from journals.models import JournalItem

faker = Faker()

def get_random_item_type():
    # 50% of items should be notes
    # 30% of items should be tasks
    # 20% of items should be events

    item_type_chance = random.random()

    if item_type_chance < .5:
        item_type = 'N' # Note
    elif item_type_chance < .8:
        item_type = 'T' # Task
    else:
        item_type = 'E' # Event

    return item_type


def get_number_of_children():
    # 10% of items should have 3 children
    # 40% of items should have 2 children
    # 30% of items should have 1 child
    # 20% of items should have 0 children
    
    children_chance = random.random()

    if item_chance_type < .1: 
        number_of_children = 3
    elif item_type_chance < .5:
        number_of_children = 2
    elif item_type_chance < .8:
        number_of_children = 1
    else:
        number_of_children = 0

    return number_of_children


def model_from_item_type(item_type):
    if item_type == 'T':
        model = Task
    elif item_type == 'N':
        model = Note
    elif item_type == 'E':
        model = Event

    return model

def serializer_from_item_type(item_type, serializer_type):

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
    parent_model = model_from_item_type(item_type)
    parent_ct = ContentType.objects.get_for_model(parent_model)
    parent_object = JournalItem.objects.filter(content_type=parent_ct, object_id=item_id, owner=owner).first()

    return parent_object


def parent_adopts_child(parent, child):
    parent.add_child(child, save=True)
    child.set_parent(parent, save=True)

    return


ITEM_TYPES = {
    'N': 'Note',
    'T': 'Task',
    'E': 'Event'
}



class Command(BaseCommand):
    help = 'Populates 200 Journal Items at random dates throughout a year. It will also randomly create parent/child relationships between certain JournalItems.'

    def handle(self, *args, **options):

        todos = requests.get('https://jsonplaceholder.typicode.com/todos').json()

        current_index = 0

        user = get_user_model().objects.filter(email="keegood8@gmail.com").first()

        while current_index < 200:
            
            todo = todos[current_index]

            # 'N' = Note, 'T' = Task, 'E' = Event
            new_item_type = get_random_item_type()

            # generate random creation datetime
            start_date = datetime.date(year=2021, month=1, day=1)
            date_created = faker.date_time_between(start_date=start_date, end_date='+1y')

            print(date_created)

            new_item = {
                'item_type': new_item_type,
                'title': todo['title'],
            }

            new_item_serializer = serializer_from_item_type(new_item_type, 'create')
            new_item = new_item_serializer(data=new_item)


            print(new_item.is_valid())

            break