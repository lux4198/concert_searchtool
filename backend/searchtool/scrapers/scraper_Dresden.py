import json
from numpy import single
import requests
from bs4 import BeautifulSoup
from datetime import datetime 
# from ..models import Event


import pytz
from locale import setlocale, LC_TIME

# download website data from main link 
data = requests.get('https://www.staatskapelle-dresden.de/konzerte/konzertkalender/')
# parse data into Beautifulsoup
soup = BeautifulSoup(data.text, 'html.parser')

# from parsed data, extract each concert item
for item in soup.find_all('div', {'class' : 'spielplan-item'}):

    # singleevent variable stores info about concert item before passing it to Event model 
    singleevent = {}

    # get the link to concert details from item 
    link = item.find('a', href=True)
    link = 'https://www.staatskapelle-dresden.de/' + link['href']
    singleevent['link'] = link

    # get json data from script tag of each concert item
    json_data = item.find('script', {'type' : 'application/ld+json'}).get_text()
    json_data = json.loads(json_data)

    # extract concert Datetime
    concert_date = json_data['startDate']
    # create datetime object 
    concert_date = datetime.strptime(concert_date, '%Y-%m-%dT%H:%M')

    # add date to singleevent and make it timezone aware 
    singleevent['datetime'] = pytz.timezone('Europe/Berlin').localize(concert_date)

    # add city to singleevent 
    # if orchestra plays at another city, check for 'Gastconcert' in title and extract city
    if 'Gastkonzert in' in json_data['name']:
        city = json_data['name'].split(' ')[2]
    else:
        city = 'Dresden'
    singleevent['city'] = city 


    # Event.objects.create(
    #     date = singleevent['datetime'], 
    #     city = singleevent['city'], 
    #     ensemble = singleevent['ensemble'], 
    #     musicians = singleevent['musicians'], 
    #     conductor = singleevent['conductor'],
    #     composers = singleevent['composers'],
    #     pieces = singleevent['pieces'],
    #     link = singleevent['link'])