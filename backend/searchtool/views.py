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


    def get_queryset(self):
        datequery = self.request.query_params.get('date')
        queryset = Event.objects.all().filter(date__gte=datequery)
        query = self.request.query_params.get('q')

        cityquery = self.request.query_params.get('city')
        

        if cityquery:
            if queryset.filter(city__in=cityquery.split(',')):
                queryset = queryset.filter(city__in=cityquery.split(','))
        
        if query:
            if queryset.filter(composers__icontains=query):
                queryset = queryset.filter(composers__icontains=query)
            elif queryset.filter(musicians__icontains=query):
                queryset = queryset.filter(musicians__icontains=query)
            elif queryset.filter(pieces__icontains=query):
                queryset = queryset.filter(pieces__icontains=query)
            elif queryset.filter(conductor__icontains=query):
                queryset = queryset.filter(conductor__icontains=query)
            else:
                queryset = Event.objects.none()
        return queryset


