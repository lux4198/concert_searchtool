import requests
from bs4 import BeautifulSoup
from datetime import datetime 
# from ..models import Event
import pytz
from locale import setlocale, LC_TIME

setlocale(LC_TIME, 'de_DE')

# get main link for symphonic concerts 
url = 'https://www.hr-sinfonieorchester.de/konzerte/konzerte-21-22/konzertreihen/hr-sinfoniekonzert-108.html'
data = requests.get(url)
soup = BeautifulSoup(data.text, 'html.parser')

defaultyear = '2021'

for item in soup.find_all('li', {'style' : 'margin-top: 20px;'}):
    singleevent = {}

    day = item.find('span', {'class' : 'c-eventTeaser__day'}).text
    month = item.find('span', {'class' : 'c-eventTeaser__month'}).text
    if month == 'Jan':
        defaultyear = '2022'
    elif month == 'Mär':
        month = 'Mrz'
    year = defaultyear
    time = item.find('span', {'class' : 'c-eventTeaser__startTime'}).text.replace('Uhr', '')
    concert_date = day + ' ' + month + ' ' + year + ' ' + time 
    # create datetime object 
    concert_date = datetime.strptime(concert_date, '%d %b %Y %H:%M ')

    # add date to singleevent and make it timezone aware 
    singleevent['datetime'] = pytz.timezone('Europe/Berlin').localize(concert_date)

    # set city to Frankfurt and Ensemble to hr-Sinphonieorchester
    singleevent['city'] = 'Frankfurt' 
    singleevent['ensemble'] = 'hr-Sinphonieorchester'

    # get musicians and conductor
    singleevent['musicians'] = {}
    musicians = item.find_all('ul' , {'class' : 'c-concert-info__list'})[0]
    musicians = musicians.find_all('li' , {'class' : 'c-concert-info__item'})
    musicians = [musician.get_text(strip = True).split('|') for musician in musicians]

    for musician in musicians: 
        if len(musician) == 2:
            singleevent['musicians'][musician[0]] = musician[1]
            if musician[1] == 'Dirigent' or 'Dirigentin':
                singleevent['conductor'] = musician[0]
        else:
            singleevent['musicians'][musician[0]] = ''

    
    # Event.objects.create(
    #             date = singleevent['date'], 
    #             city = singleevent['city'], 
    #             ensemble = singleevent['ensemble'], 
    #             musicians = singleevent['musicians'], 
    #             conductor = singleevent['conductor'],
    #             composers = singleevent['composers'],
    #             pieces = singleevent['pieces'],
    #             link = singleevent['link'])

    