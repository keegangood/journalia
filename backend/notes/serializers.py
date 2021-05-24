from rest_framework import serializers
from .models import Note

class NoteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
    # date_created = serializers.DateTimeField()
    # last_modified = serializers.DateTimeField()


class NoteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ['item_type',]
    

    item_type = serializers.CharField(max_length=1, default = 'N') # 'N' for Note




