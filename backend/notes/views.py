from datetime import datetime

from django.contrib.auth import get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, exceptions, pagination
from users.authentication import SafeJWTAuthentication

from .models import Note
from .serializers import NoteCreateSerializer, NoteDetailSerializer
from users.serializers import UserDetailSerializer

@api_view(['GET', 'POST'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def notes_list(request):
    '''
    GET  - get paginated list of user's notes for specified date range
    POST - create new note for authenticated user
    '''
    response = Response()
    
    if request.method == 'GET':
        # get the user's notes for the given time range 

        print(request.query_params.get('per_page'))
        print(request.query_params.get('page'))

        paginator = pagination.PageNumberPagination()
        paginator.page_size_query_param = 'per_page'
        paginator.page_query_param = 'page'
        notes = Note.objects.filter(owner=request.user.id).order_by('date_created')
        notes_page = paginator.paginate_queryset(notes, request)

        notes = Note.objects.filter(owner=request.user.id)
        notes_serializer = NoteDetailSerializer(
            notes_page, many=True)

        response.data = {'notes':notes_serializer.data}

    elif request.method == 'POST':
        # create new note

        request.data['owner'] = request.user.id # UserDetailSerializer(data=request.user)

        note_serializer = NoteCreateSerializer(data=request.data, context={'request': request})

        user = get_user_model().objects.filter(id=request.user.id).first()
        # user = UserDetailSerializer(data=user)

        split_date = lambda date_string: [int(item) for item in date_string.split('-')]
        y,m,d = split_date(request.data['date_created'])
        date = datetime(y,m,d)
        note_serializer.initial_data['date_created'] = date

        y,m,d = split_date(request.data['last_modified'])
        date = datetime(y,m,d)
        note_serializer.initial_data['last_modified'] = date
        

        # note_serializer.initial_data['owner'] = user.id
        # note_serializer.initial_data['owner'] = request.user.id
        print(note_serializer.initial_data)
        if note_serializer.is_valid(raise_exception=True):
           
            # print(request.data)


            note_serializer.save()
            print(note_serializer.validated_data)
            
            response.data = note_serializer.validated_data
            response.status_code = status.HTTP_201_CREATED
        else:
            print(note_serializer.errors)
            print(note_serializer.initial_data)
            response.status_code = status.HTTP_400_BAD_REQUEST

    return response

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([SafeJWTAuthentication])
@ensure_csrf_cookie
def note_detail(request, id):
    '''
    GET - view note details
    PUT - update given note
    '''
    pass