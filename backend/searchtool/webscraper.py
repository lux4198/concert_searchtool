import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime
from locale import setlocale, LC_TIME

setlocale(LC_TIME, 'de_DE')

from .models import Event 

# goes to details page of given concert and returns composers : pieces as dict 
def get_concert_details(details_link):
    data = requests.get(details_link)
    soup = BeautifulSoup(data.text, 'html.parser')
    
    # lists every composer , piece as tuple (excludes empty divs)
    pieces  = [(item.contents[0].text, item.contents[1].text) for item in soup.find_all('div', {'class' : 'piece'})if item.contents[0].text]

    pieces_dict = {}

    # adds composers and pieces to dict, if composer already has an entry only the piece will be added
    for piece in pieces: 
        if piece[0] not in pieces_dict:
            pieces_dict[piece[0]] = [piece[1]]
        else:
            pieces_dict[piece[0]].append(piece[1])
    return pieces_dict

def date_march(concert_date):
    if concert_date.split(' ')[1] != 'Mär':
        concert_date = datetime.strptime(concert_date, '%A,%d. %b %Y,  %H.%M')
    else:
        concert_date = concert_date.split(' ')
        concert_date[1] = 'Mrz'
        concert_date = ' '.join(concert_date)
        concert_date = datetime.strptime(concert_date, '%A,%d. %b %Y,  %H.%M')
    return concert_date 



def main():

    month_list = ['2021-12', '2022-01', '2022-02', '2022-03', '2022-04', '2022-05', '2022-06', '2022-07']
    # month_list = ['2022-03']

    for month in month_list:
        print(month, '\n')

        data = requests.get('https://www.berliner-philharmoniker.de/konzerte/kalender/von/' + month)
        soup = BeautifulSoup(data.text, 'html.parser')

        concerts = []

        # find each concert in concert list 
        for element in soup.find_all('article', { 'class' : 'calendar-entry clickable-box orchestra'}):

            singleevent = {}

            # get details from each concert 
            concert_date = element.find('div', {'class' : 'performance-date'})

            musicians = element.find_all(['h2', 'h3'], {'class' : ['main-musician', 'other-musician']})


            # create datetime objects from concert_date - sample: Samstag,08. Jan 2022, 19.00 Uhr
            concert_date = ' '.join(concert_date.text.split(' ')[:-1])

            # convert Mär to Mrz so strptime can parse data for march
            concert_date = date_march(concert_date)
            
            singleevent['date'] = concert_date


            # get musicians / orchester from musicians element 
            singleevent['musicians'] = {}
            for div in musicians:
                musician = div.contents[0]
                role = div.find('span', {'class' : 'role'})

                if not role:
                    singleevent['musicians'][musician] = musician
                else:
                    if not role.contents:
                        singleevent['musicians'][musician] = musician
                        continue
                    singleevent['musicians'][musician] = role.contents[0]


            # create link that leads to specific concert 
            details_link = element.find('a', {'class' : 'button grey read-more action-item'}, href = True)
            details_link = 'https://www.berliner-philharmoniker.de/' + details_link['href']

            # safe link to singleevent 
            singleevent['link'] = details_link


            # get composers and pieces from details_link
            composers_pieces = get_concert_details(details_link)
            singleevent['composers'] = [item for item  in composers_pieces.keys()]
            singleevent['pieces'] = [value for value in composers_pieces.values()]


            # define the city of the events 
            singleevent['city'] = 'Berlin'

            # create entries in database for scraped data 
            Event.objects.create(
                date = singleevent['date'], 
                city = singleevent['city'], 
                musicians = singleevent['musicians'], 
                composers = singleevent['composers'],
                pieces = singleevent['pieces'],
                link = singleevent['link'])

            

            concerts.append(singleevent)

        for item in concerts:
            print(item, '\n')


if __name__ == '__main__':
    main()
