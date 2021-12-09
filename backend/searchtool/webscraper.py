import requests
from bs4 import BeautifulSoup
import re
from .models import Event


def main():
    month_list = ['2021-12', '2022-01', '2022-02', '2022-03', '2022-04', '2022-05', '2022-06', '2022-07']

    for month in month_list:
        print(month, '\n')

        data = requests.get('https://www.berliner-philharmoniker.de/konzerte/kalender/von/' + month)
        soup = BeautifulSoup(data.text, 'html.parser')

        event = []

        for element in soup.find_all('article', { 'class' : 'calendar-entry clickable-box orchestra'}): 
            concert = element.find_all('div', {'class' : 'performance-details-wrapper'})
            concert_date = element.find('div', {'class' : 'performance-date'})
            event.append([concert, concert_date])


        concerts = []

        for element in event:
            singleevent = {}
            list = re.split(r'[\W+]+', element[1].text)
            singleevent['date'] = month + '-' + list[1] + ' ' + list[-3] + ':' + list[-2]
            for div in element[0]:      
                info = []    
                for txt in div: 
                    info.append(txt.text)

                singleevent['location'] = info[0]
                singleevent['conductor'] = info[1]
                singleevent['artists'] = info[2:-1]
                singleevent['pieces'] = info[-1]

            Event.objects.create(date = singleevent['date'], 
                location = singleevent['location'],
                conductor = singleevent['conductor'], 
                artists = singleevent['artists'], 
                pieces = singleevent['pieces'])

            

            concerts.append(singleevent)

        for item in concerts:
            print(item, '\n')

