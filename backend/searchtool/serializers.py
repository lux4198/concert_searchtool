from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'date', 'city', 'link', 'musicians', 'composers', 'pieces', 'conductor', 'ensemble',
                    'title',)
