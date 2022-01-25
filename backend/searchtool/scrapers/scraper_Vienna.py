import requests
from bs4 import BeautifulSoup
from datetime import datetime 
# from ..models import Event
import pytz

data = requests.get('https://www.wienersymphoniker.at/de/saison/konzerte')   
soup = BeautifulSoup(data.text, 'html.parser')




