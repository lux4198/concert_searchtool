import requests
from bs4 import BeautifulSoup
from datetime import datetime 
# from ..models import Event


def date_parser(concert_date):
    formats = [' %d.%m.%Y %H ', ' %d.%m.%Y %H.%M ']
    for format in formats:
        try:
            return datetime.strptime(concert_date, format)
        except:
            continue


# main link for concert calender 

data = requests.get('https://www.mphil.de/konzerte-karten/kalender')
soup = BeautifulSoup(data.text, 'html.parser')

for item in soup.find_all('li', {'class' : 'mp16_cal-listitem card__vertical opas-list-element'}):

    # for now only look at concerts in the main concerts hall / Isarphilharmonie
    if not item.find('div', {'class' : 'concert__venue'}).text == 'Isarphilharmonie':
        continue

    singleevent = {}

    # find concert date and parse add it as datetime object to singleevent 
    concert_date = item.find('time', {'class' : 'concert__date'})
    concert_date = concert_date.text.replace('Uhr', '')
    concert_date = ''.join(concert_date.split(',')[1:])
    concert_date = date_parser(concert_date)
    
    singleevent['datetime'] = concert_date

    # set city of events to Munich
    singleevent['city'] = 'Munich'

    # get link for each concert 
    link = item.find('figure', {'class' : 'card__image'}).find('a', href=True)['href']
    link = 'https://www.mphil.de' + link
    singleevent['link'] = link

    # get information about musicians and conductor 
    singleevent['musicians'] = {}
    musicians = item.find('dl', {'class' : 'concert__persons'}).find_all('dt')
    musicians = [musician.get_text(strip=True) for musician in musicians]
    roles = item.find('dl', {'class' : 'concert__persons'}).find_all('dd')
    roles = [role.get_text(strip = True) for role in roles]

    for musician, role in zip(musicians, roles):
        singleevent['musicians'][musician] = role










# # create entries in database for scraped data 
#             Event.objects.create(
#                 date = singleevent['datetime'], 
#                 city = singleevent['city'], 
#                 ensemble = singleevent['ensemble'], 
#                 musicians = singleevent['musicians'], 
#                 conductor = singleevent['conductor'],
#                 composers = singleevent['composers'],
#                 pieces = singleevent['pieces'],
#                 link = singleevent['link'])