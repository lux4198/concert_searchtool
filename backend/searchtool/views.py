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
# from unidecode import unidecode 

# Create your views here.

class EventView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    model = Event

    queryset = Event.objects.all().order_by('date')
    queryset = queryset.filter(date__gte=str(datetime.datetime.now()))


    def get_queryset(self):
        datequery = self.request.query_params.get('date')
        items = self.request.query_params.get('n')

        if not datequery:
            datequery = str(datetime.datetime.now())
        if not items: 
            items = len(Event.objects.all().filter(date__gte=datequery))

        queryset = Event.objects.all().filter(date__gte=datequery)

        query = self.request.query_params.get('q')
        piece_query = self.request.query_params.get('p')

        cityquery = self.request.query_params.get('city')
        

        if cityquery:
            if queryset.filter(city__in=cityquery.split(',')):
                queryset = queryset.filter(city__in=cityquery.split(','))
        
        if query:
            query = query.split(',')
            for item in query:
                if queryset.filter(composers__unaccent__icontains=item):
                    queryset = queryset.filter(composers__unaccent__icontains=item)
                elif queryset.filter(musicians__icontains=item):
                    queryset = queryset.filter(musicians__icontains=item)
                elif queryset.filter(conductor__icontains=item):
                    queryset = queryset.filter(conductor__icontains=item)
                else:
                    queryset = Event.objects.none()
        if piece_query:
            piece_query = piece_query.split(',')
            for item in piece_query:
                if queryset.filter(pieces__icontains=item):
                        queryset = queryset.filter(pieces__icontains=item)
                else:
                    queryset = Event.objects.none()

        return queryset[:int(items)]


