import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
from locale import setlocale, LC_TIME

setlocale(LC_TIME, 'de_DE')

# from .models import Event 


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
            musicians = element.find_all('h2', {'class' : 'main-musician'})

            concert_date = ' '.join(concert_date.text.split(' ')[:-1])
            concert_date = datetime.strptime(concert_date, '%A,%d. %b %Y,  %H.%M')

            event.append({'concert_general' : concert, 'date' : concert_date, 'musicians' : musicians})


        concerts = []

        for element in event:

            singleevent = {}

            singleevent['date'] = element['date']

            for div in element['concert_general']:      
                info = [txt.text for txt in div]    

                singleevent['ensemble'] = info[0]
                singleevent['pieces'] = info[-1]

            singleevent['musicians'] = {}
            for div in element['musicians']:
                musician = div.contents[0]
                role = div.find('span', {'class' : 'role'})
                
                if not role:
                    singleevent['musicians'][musician] = 'Orchester'
                else:
                    singleevent['musicians'][musician] = role.contents[0]

            singleevent['city'] = 'Berlin'

            # Event.objects.create(date = singleevent['date'], 
            #     location = singleevent['location'],
            #     conductor = singleevent['conductor'], 
            #     artists = singleevent['artists'], 
            #     pieces = singleevent['pieces'])

            

            concerts.append(singleevent)

        for item in concerts:
            print(item, '\n')


if __name__ == '__main__':
    main()
