from rest_framework import serializers
from .models import Note


class NoteCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Note
        fields = ['title', 'is_important', 'is_research', 'is_good_idea']



class NoteDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Note
        fields = '__all__'

