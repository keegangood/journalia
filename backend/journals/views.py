from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from users.models import User
from users.authentication import SafeJWTAuthentication
from tasks.models import Task
from notes.models import Note
from .models import JournalItem
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q

@api_view(['GET'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def journal_item_list(request):

    # delete all JournalItems, Notes and Tasks for testing
    JournalItem.objects.all().delete()
    Note.objects.all().delete()
    Task.objects.all().delete()
    
    print(request.user)

    # get a user object
    user = User.objects.get(id=request.user.id)

    # create notes, and tasks
    note_1 = Note.objects.create(title=f"note {Note.objects.count()}")
    
    task_1 = Task.objects.create(title=f"task {Task.objects.count()}")
    task_2 = Task.objects.create(title=f"task {Task.objects.count()}")
    task_3 = Task.objects.create(title=f"task {Task.objects.count()}")
    
    print("event_1:", event_1)
    print("task_1:", task_2)
    print("task_2:", task_3)
    print("note_1:", note_1)
    print("note_2:", note_2)



    # find the content type for each model
    note_ct = ContentType.objects.get_for_model(Note)
    task_ct = ContentType.objects.get_for_model(Task)
    event_ct = ContentType.objects.get_for_model(Event)

    # create JournalItem objects to store the new task and note objects
    j_task_1 = JournalItem.objects.create(content_object=task_1, item_type='T', owner=user) # children: note_1 and task_3
    j_task_2 = JournalItem.objects.create(content_object=task_2, item_type='T', owner=user) # no children
    j_task_3 = JournalItem.objects.create(content_object=task_3, item_type='T', owner=user)
    
    j_note_1 = JournalItem.objects.create(content_object=note_1, item_type='N', owner=user)
    

    j_note_1.parent_object = j_task_1
    j_task_3.parent_object = j_task_1

    # make both notes the children of the task
    j_task_1.children.add(j_note_1)
    j_task_1.children.add(j_task_3)


    print('j_task_1_children:', j_task_1.children.all())
    print('j_task_2_children:', j_task_2.children.all())
    
    # print('j_note_1_parent:', child_1.parent_object)

    print("j_note_1.parent_object:", j_note_1.parent_object)
    print("j_task_3.parent_object:", j_task_3.parent_object)



    return Response(
        data = {
            "msg": "Yep"
        }
    )