from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


from users.models import User
from tasks.models import Task
from notes.models import Note
from .models import JournalItem
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q


@api_view(['GET'])
def journal_item_list(request):

    JournalItem.objects.all().delete()
    Note.objects.all().delete()
    Task.objects.all().delete()


    note_ct = ContentType.objects.get_for_model(Note)
    task_ct = ContentType.objects.get_for_model(Task)

    note = Note.objects.create(title=f"note {Note.objects.count()}")
    task = Task.objects.create(title=f"task {Task.objects.count()}")
    user = User.objects.first()

    print(note)
    print(task)

    j_task = JournalItem.objects.create(content_object=task, item_type='T', owner=user)
    j_note = JournalItem.objects.create(content_object=note, item_type='N', owner=user)


    print(j_task)
    print(j_note)

   
    j_task.children.add(j_note)

    child = j_task.children.first()
    child.parent_object=j_task
    print(child.parent_object.children.all())


    return Response(
        data = {
            "msg": "Yep"
        }
    )