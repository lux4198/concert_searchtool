from django.shortcuts import render
from django.http import HttpResponse

from .models import Event
from .webscraper import main

# Create your views here.

def home(request):
    events = {
        'concerts' : Event.objects.all()
    }
    return(
        render(request, 'searchtool/display.html', events)
    )