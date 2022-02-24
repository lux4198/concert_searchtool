from numpy import single
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from locale import setlocale, LC_TIME
import pytz

setlocale(LC_TIME, 'de_DE')

# from ..models import Event 

# scraper looks at orchestra and chamber music events 


# goes to details page of given concert and returns composers : pieces as dict 
def get_concert_details(details_link):
    data = requests.get(details_link)
    soup = BeautifulSoup(data.text, 'html.parser')
    
    # lists every composer , piece as tuple (excludes empty divs)
    
    pieces = []
    for item in soup.find_all('div' , {'class' : 'piece'}):
        if len(item.contents) == 2:
            pieces.append((item.contents[0].text, item.contents[1].text))
        elif len(item.contents) == 1:
            pieces.append((item.contents[0].text, '')) 
        else:
            continue

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
    return pytz.timezone('Europe/Berlin').localize(concert_date)
    



def main():
    concerts = []
    month_list = ['2022-02', '2022-03', '2022-04', '2022-05', '2022-06', '2022-07']


    for month in month_list:
        print(month, '\n')
        urls = ['https://www.berliner-philharmoniker.de/konzerte/kalender/veranstaltungen/von/' + month + '/cat/ensemble/', 
        'https://www.berliner-philharmoniker.de/konzerte/kalender/von/' + month]

        for url in urls:
            data = requests.get(url)

            soup = BeautifulSoup(data.text, 'html.parser')

            # find each concert in concert list 
            for element in soup.find_all('article', { 'class' : 'calendar-entry clickable-box ensemble'}):

                singleevent = {}

                if urls.index(url) == 0:
                    singleevent['ensemble'] = 'Kammermusik'
                else:
                    singleevent['ensemble'] = 'Berliner Philharmoniker'

                # get details from each concert 
                concert_date = element.find('div', {'class' : 'performance-date'})

                musicians = element.find_all(['h2', 'h3'], {'class' : ['main-musician', 'other-musician']})


                # create datetime objects from concert_date - sample: Samstag,08. Jan 2022, 19.00 Uhr
                concert_date = ' '.join(concert_date.text.split(' ')[:-1])

                # convert Mär to Mrz so strptime can parse data for march
                concert_date = date_march(concert_date)

                singleevent['datetime'] = concert_date


                # get musicians / orchester from musicians element 
                singleevent['musicians'] = {}
                singleevent['conductor'] = ''  
                for div in musicians:
                    musician = div.contents[0]
                    role = div.find('span', {'class' : 'role'})

                    if not role:
                        if musician == 'Berliner Philharmoniker':
                            continue
                        singleevent['musicians'][musician] = ''
                    else:
                        if not role.contents:
                            singleevent['musicians'][musician] = ''
                            continue
                        if role.contents[0] == ' Dirigent':
                            singleevent['conductor'] = musician
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
                # print(singleevent)

                # create entries in database for scraped data 
                # Event.objects.create(
                #     date = singleevent['date'], 
                #     city = singleevent['city'], 
                #     ensemble = singleevent['ensemble'], 
                #     musicians = singleevent['musicians'], 
                #     conductor = singleevent['conductor'],
                #     composers = singleevent['composers'],
                #     pieces = singleevent['pieces'],
                #     link = singleevent['link'])

                concerts.append(singleevent)
    return(concerts)

        


if __name__ == '__main__':
    main()
