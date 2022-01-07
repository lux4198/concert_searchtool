from django.db.models.query import QuerySet
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, filters

from .models import Event
from .scrapers.scraper_Berlin import main
from .serializers import EventSerializer

# Create your views here.

class EventView(generics.ListCreateAPIView):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer
    
    search_fields = ['conductor', 'city', 'date', 'composers', 'pieces', 'musicians', 'ensemble']
    filter_backends = (filters.SearchFilter,)



