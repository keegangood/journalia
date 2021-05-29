from rest_framework import serializers
from .models import Task

class TaskDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['item_type',]

    item_type = serializers.CharField(max_length=1, default = 'T') # 'T' for Task

class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'