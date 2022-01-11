from django.db.models.query import QuerySet
from django.db.models.query_utils import Q
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
    model = Event

    filterset_fields = ['city', 'conductor', 'ensemble', 'date']

    def get_queryset(self):
        queryset = Event.objects.all()
        composer= self.request.query_params.get('composer')
        musician = self.request.query_params.get('musician')
        piece = self.request.query_params.get('piece')
        
        if composer:
            queryset = queryset.filter(composers__icontains=composer)
        elif musician:
            queryset = queryset.filter(musicians__icontains=musician)
        elif piece:
            queryset = queryset.filter(pieces__icontains=piece)
        
        return queryset


