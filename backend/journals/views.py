from journals.serializers import JournalItemChildrenField
from journals.serializers import JournalItemDetailSerializer
from django.db.models import query
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db import connection, reset_queries
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from users.models import User
from users.serializers import UserDetailSerializer
from users.authentication import SafeJWTAuthentication
from events.models import Event
from tasks.models import Task
from notes.models import Note
from .models import JournalItem
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q
from django.db.models import Prefetch

@api_view(['GET'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def journal_item_list(request):

    # delete all JournalItems, Notes and Tasks for testing
    JournalItem.objects.all().delete()
    Note.objects.all().delete()
    Task.objects.all().delete()
    
    # print(request.user)

    # get a user object
    user = User.objects.get(id=request.user.id)
    
# ----------------------------------------------------------------------- #


    # create notes, and tasks
    task_1 = Task.objects.create(title="Walk the dog")
    note_1 = Note.objects.create(title="Avoid Main St.")
    event_1 = Event.objects.create(title="Saw a raccoon!")
    

    # print("event_1:", event_1)
    # print("task_1:", task_1)
    # print("note_1:", note_1)
    # print("event_1:", event_1)
 

    # create JournalItem objects to store the new task and note objects
    j_task_1 = JournalItem.objects.create(content_object=task_1, item_type='T', owner=user) # children: note_1 and task_3
    j_note_1 = JournalItem.objects.create(content_object=note_1, item_type='N', owner=user)
    j_event_1 = JournalItem.objects.create(content_object=event_1, item_type='E', owner=user)
    
    j_note_1.parent_object = j_task_1
    j_event_1.parent_object = j_task_1

    # make both notes the children of the task
    j_task_1.children.add(j_note_1)
    j_task_1.children.add(j_event_1)
    
    j_note_1.parent_object = j_task_1
    j_note_1.parent_id = j_task_1.id
    j_event_1.parent_object = j_task_1
    j_note_1.parent_id = j_task_1.id
    
    j_event_1.save()
    j_note_1.save()
    j_task_1.save()

    # print("j_note_1.parent_object:", j_note_1.parent_object)
    # print("j_note_1.parent_object:", j_note_1.parent_object)

# --------------------------------------------------------------------------- #

    event_2 = Event.objects.create(title="Mom arrives")
    task_2  = Task.objects.create( title="Organize house")
    note_2  = Note.objects.create( title="Get rid of stuff!!!")
    note_2  = Note.objects.create( title="Buy flowers")
    
    # print("event_2:", event_2)
    # print("task_2:", task_2)
    # print("note_2:", note_2)
    
    j_event_2 = JournalItem.objects.create(content_object=event_2, item_type='E', owner=user)
    j_task_2 = JournalItem.objects.create(content_object=task_2, item_type='T', owner=user)
    j_note_2 = JournalItem.objects.create(content_object=note_2, item_type='N', owner=user)
    
    # make both notes the children of the task
    j_event_2.children.add(j_task_2)
    j_event_2.children.add(j_note_2)

    j_task_2.parent_object = j_event_2
    j_task_2.parent_id = j_event_2.id
    j_note_2.parent_object = j_event_2
    j_note_2.parent_id = j_event_2.id
    j_task_2.save()
    j_note_2.save()

    # print('j_task_1_children:', j_task_1.children.all())
    # print('j_event_2_children:', j_event_2.children.all())
    
    # print('j_note_1_parent:', child_1.parent_object)

# ------------------------------------------------------------------------------------------ #
    

    # find the content type for each model
    note_ct = ContentType.objects.get_for_model(Note)
    task_ct = ContentType.objects.get_for_model(Task)
    event_ct = ContentType.objects.get_for_model(Event)





    reset_queries()
    # items = JournalItem.objects.filter(owner=user, parent_id=None).filter(Q(content_type=task_ct) | Q(content_type=event_ct)).prefetch_related('children')

    # j = JournalItem.objects.prefetch_related('children').filter(owner=user, parent_id=None)


    # journal_item_objects = JournalItem.objects.filter(owner=user, parent_id=None).prefetch_related('content_object')

    # get all top-level journal items and their children for a particular user
    # WHYYYYYY!?!?!?
    user = User.objects.filter(id=request.user.id).prefetch_related(
        Prefetch('journal_items', queryset=JournalItem.objects.filter(
            owner=request.user, parent_id=None).prefetch_related('children__content_object'), to_attr='top_level_journal_items'))
    
    journal_items = []
    # for item in user.first().top_level_journal_items:
    #     item_dict = {}
        
    #     children = item.children.all()
    #     for child in children:
    #         print(child.content_object)

    

    journal_items = user.first().top_level_journal_items
    journal_item_serializer = JournalItemDetailSerializer(journal_items, many=True)


    # for journal_item in journal_items:
    #     journal_item_serializer.data.append(journal_item)

    #     journal_item.children.all()

    # print(journal_item_serializer.data)

    
    print(len(connection.queries))
    return Response(data={
        "journal_items":journal_item_serializer.data})

