from django.db.models.query import QuerySet
from django.db.models.query_utils import Q
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, filters

from .models import Event
from .scrapers.scraper_Berlin import main
from .serializers import EventSerializer

import datetime 
import pytz

# Create your views here.

class EventView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    model = Event

    queryset = Event.objects.all().order_by('date')
    queryset = queryset.filter(date__gte=str(datetime.datetime.now()))

    filterset_fields = ['city', 'conductor', 'ensemble', 'date']

    def get_queryset(self):
        queryset = Event.objects.all().filter(date__gte=str(datetime.datetime.now()))
        query = self.request.query_params.get('q')
        
        if query:
            if queryset.filter(composers__icontains=query):
                queryset = queryset.filter(composers__icontains=query)
            elif queryset.filter(musicians__icontains=query):
                queryset = queryset.filter(musicians__icontains=query)
            elif queryset.filter(pieces__icontains=query):
                queryset = queryset.filter(pieces__icontains=query)
            else:
                queryset = Event.objects.none()
        
        return queryset


