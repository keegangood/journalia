from rest_framework import serializers
from .models import Note

class NoteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        exclude=['owner',]

    # date_created = serializers.DateTimeField()
    # last_modified = serializers.DateTimeField()

    def create(self, validated_data):

        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)


class NoteDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Note
        fields = '__all__'

