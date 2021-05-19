from rest_framework import serializers
from .models import Event


class EventDetailSerializer(serializers.ModelSerializer):

    item_type = serializers.CharField(max_length=1, default = 'E') # 'E' for 'Event'

    class Meta:
        model = Event
        fields = '__all__'