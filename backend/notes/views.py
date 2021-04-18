from django.contrib.auth import get_user_model
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, exceptions
from users.authentication import SafeJWTAuthentication

from .models import Note
from .serializers import NoteCreateSerializer, NoteDetailSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def notes_list(request):
    response = Response()
    
    if request.method == 'GET':
        # get the user's notes for the given time range 

        notes = Note.objects.filter(owner=request.user.id)
        notes_serializer = NoteDetailSerializer(
            notes, many=True)
            
        response.data = {'notes':notes_serializer.data}

    elif request.method == 'POST':
        note_serializer = NoteCreateSerializer(data=request.data)

        User = get_user_model()
        user = User.objects.filter(id=1)
        print(user)
       

        if note_serializer.is_valid():
            note_serializer.save(owner=user)
            
            response.data = note_serializer.validated_data

    return response

