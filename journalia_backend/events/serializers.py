from rest_framework import serializers
from rest_framework.views import set_rollback
from .models import Event


class EventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['item_type',]

    item_type = serializers.CharField(max_length=1, default = 'E') # 'E' for 'Event'



class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'