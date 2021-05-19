from rest_framework import serializers
from .models import Task

class TaskDetailSerializer(serializers.ModelSerializer):

    item_type = serializers.CharField(max_length=1, default = 'T') # 'T' for Task

    class Meta:
        model = Task
        fields = '__all__'