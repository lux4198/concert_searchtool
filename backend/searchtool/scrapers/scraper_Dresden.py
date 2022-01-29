import requests
from bs4 import BeautifulSoup
from datetime import datetime 
# from ..models import Event


import pytz
from locale import setlocale, LC_TIME

data = requests.get('https://www.staatskapelle-dresden.de/konzerte/konzertkalender/')
soup = BeautifulSoup(data.text, 'html.parser')

for item in soup.find_all('div', {'class' : 'spielplan-item'}):
    singleevent = {}

    link = item.find('a', href=True)
    link = 'https://www.staatskapelle-dresden.de/' + link['href']

    singleevent['link'] = link
    print(link)

    # Event.objects.create(
    #     date = singleevent['datetime'], 
    #     city = singleevent['city'], 
    #     ensemble = singleevent['ensemble'], 
    #     musicians = singleevent['musicians'], 
    #     conductor = singleevent['conductor'],
    #     composers = singleevent['composers'],
    #     pieces = singleevent['pieces'],
    #     link = singleevent['link'])