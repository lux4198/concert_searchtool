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

    