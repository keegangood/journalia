from django.db.models import query
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db import connection, reset_queries

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated


from users.models import User
from users.serializers import UserDetailSerializer
from users.authentication import SafeJWTAuthentication

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
from django.db.models import Prefetch

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






@api_view(['GET', 'POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def journal_item_list(request):
    # GET A USER OBJECT WITH ALL OF ITS RELATED JOURNAL ITEMS
    # ------------------------------------------------------------------------------------------------------------------------------ #
    # ------------------------------------------------------------------------------------------------------------------------------ #
    response = Response()
    if request.method == 'GET':

        print(request.query_params)

        reset_queries()

        # This will also need to include a date range (24-hours, 1-week, 1-month, 1-year)
        # get all top-level journal items and their children for a particular user
        # WHYYYYYY!?!?!?
        user = User.objects.filter(id=request.user.id).prefetch_related(
            Prefetch('journal_items', queryset=JournalItem.objects.filter(
                owner=request.user, parent_id=None).prefetch_related(
                    'children__content_object'), to_attr='top_level_journal_items')).first()
        
        journal_items = user.top_level_journal_items
        journal_item_serializer = JournalItemDetailSerializer(journal_items, many=True)

        # organize journal items in their respective days as dict
        
        print(len(connection.queries))

        response.data = {"journalItems": journal_item_serializer.data}



    # CREATE JOURNAL ITEM
    # ------------------------------------------------------------------------------------------------------------------------------ #
    # ------------------------------------------------------------------------------------------------------------------------------ #
    elif request.method == 'POST':
        user = User.objects.get(id=request.user.id)

        # get the serializer for the new item based on its model
        new_item_type = request.data.get('item_type')
        new_item_serializer = serializer_from_item_type(new_item_type, 'create')
        
        # initialize the serializer with the data
        new_item_serializer = new_item_serializer(data=request.data)

        if new_item_serializer.is_valid():

            # save new item
            new_item = new_item_serializer.save()
            
            # create journal item for new item
            journal_item = JournalItem.objects.create(content_object=new_item, item_type=new_item_type, owner=user)

            # get parent info from request
            parent_data = request.data.get('parent')
            
            # check if new item will have a parent
            if parent_data:
                parent_type = parent_data.get('item_type')
                parent_id = parent_data.get('object_id')
                # get model, ContentType and parent JournalItem objects
                
                parent_object = get_parent_object(parent_type, parent_id, user)

                # if the parent exists
                if parent_object:
                    
                    # to maintain a single level of relationship if the parent object 
                    # is a child of another object, it can't have children
                    if parent_object.is_child:
                        response.status_code = status.HTTP_400_BAD_REQUEST
                        response.data = {"errors":["item cannot have children"]}
                        return response
                        
                    else:
                        parent_adopts_child(parent=parent_object, child=journal_item)
   
                # if the parent item doesn't exist
                else:                
                    # delete new item that was just created
                    new_item.delete()

                    response.status_code = status.HTTP_400_BAD_REQUEST
                    response.data = {
                        "error": "specified parent object doesn't exist"
                    }

                    return response
               
            journal_item = JournalItemDetailSerializer(journal_item)

            response.data = {
                "newItem": journal_item.data,
                "messages": ["Created successfully!"]
            }
        else:

            response.status_code = status.HTTP_400_BAD_REQUEST
            response.data = {
                'errors': new_item_serializer.errors
            }    


    return response
        








@api_view(['GET', 'POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def journal_item_detail(request):
    response = Response()
    user = User.objects.get(id=request.user.id)

    # GET SINGLE JOURNAL ITEM
    # ----------------------------------------------------------------------------------------------------------------------------- #
    # ----------------------------------------------------------------------------------------------------------------------------- #
    if request.method == "GET":
        item_type = request.data.get('item_type')
        item_id = request.data.get('item_id')

        # if a particular item is specified, get the item
        if item_type and item_id:

            item_model = model_from_item_type(item_type)
            item_ct = ContentType.objects.get_for_model(item_model)
            journal_item = JournalItem.objects.prefetch_related(
                'content_object').filter(
                    content_type=item_ct, object_id=item_id, owner=request.user).first()


            if journal_item is None:
                response.status_code=status.HTTP_400_BAD_REQUEST
                response.data = {"errors": [f"item not found"]}

            else:
                detail_serializer = JournalItemDetailSerializer(journal_item) 

                response.data = {
                    "journalItem": detail_serializer.data,
                }

        else:

            response.status_code=status.HTTP_400_BAD_REQUEST
            response.data = {"errors": ["missing item_type or item_id in request data for JournalItem"]}

    # UPDATE JOURNAL ITEM
    # ----------------------------------------------------------------------------------------------------------------------------- #
    # ----------------------------------------------------------------------------------------------------------------------------- #
    elif request.method == "POST":
        item_type = request.data.get('item_type')
        item_id = request.data.get('item_id')

        if item_type and item_id:

            item_model = model_from_item_type(item_type)
            item_ct = ContentType.objects.get_for_model(item_model)
            journal_item = JournalItem.objects.prefetch_related('content_object').filter(content_type=item_ct, object_id=item_id, owner=request.user).first()

            if journal_item is None:
                response.status_code=status.HTTP_400_BAD_REQUEST
                response.data = {"errors": [f"item not found"]}
            else:

                create_serializer = serializer_from_item_type(item_type, 'create')

                create_serializer = create_serializer(journal_item.content_object, data=request.data.get('updated_fields'), partial=True) 

                if create_serializer.is_valid():    

                    # get parent info from request
                    parent_data = request.data.get('parent')
            

                    # check if new item will have a parent
                    if parent_data:
                        
                        
                        parent_type = parent_data.get('item_type')
                        parent_id = parent_data.get('object_id')
                        
                        parent_object = get_parent_object(parent_type, parent_id, user)

                        # if the parent exists
                        if parent_object:

                            if journal_item.is_child:
                                response.status_code = status.HTTP_400_BAD_REQUEST
                                response.data = {"errors":["item cannot have children"]}
                                return response

                            parent_adopts_child(parent=parent_object, child=journal_item)

                        # if the parent item doesn't exist
                        else:                
                            # delete new item that was just created

                            response.status_code = status.HTTP_400_BAD_REQUEST
                            response.data = {
                                "errors": ["specified parent object doesn't exist"]
                            }

                            return response


                    create_serializer.save()

                    response.data = {
                        "updatedObject": JournalItemDetailSerializer(journal_item).data,
                        "messages": ["Updated successfully!"]
                    }


                else:
                    response.data = create_serializer.errors

        else:
            response.status_code=status.HTTP_400_BAD_REQUEST
            response.data = {"errors": ["missing item_type or item_id in request data for JournalItem"]}



    return response







@api_view(['POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def journal_item_delete(request):
    '''Delete a JournalItem'''

    response = Response()

    if request.data.get('item_id'):
        item_id = request.data.get('item_id')
        item_type = request.data.get('item_type')
        
        item_model = model_from_item_type(item_type)

        item_type = ContentType.objects.get_for_model(item_model)

        # delete the particular item
        journal_item = JournalItem.objects.filter(content_type=item_type, object_id=item_id, owner=request.user).first()

    else:
        journal_item = JournalItem.objects.first()
    

        if journal_item is None:
            response.status_code = status.HTTP_400_BAD_REQUEST
            response.data={'errors': ["No JournalItem objects exist."]}

        else:
            # this will trigger the pre_delete signal to delete the related
            # content object and all children of the deleted item
            journal_item.delete()

            response.data={
                'messages': ['deleted successfully']
            }
    
    return response
    

