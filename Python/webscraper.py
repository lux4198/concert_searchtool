import requests
from bs4 import BeautifulSoup

month_list = ['2021-12', '2022-01', '2022-02']

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
        singleevent['date'] = element[1].text
        for div in element[0]:      
            info = []      
            for txt in div: 
                info.append(txt.text) 
            singleevent['info'] = info
            concerts.append(singleevent)

    for item in concerts:
        print(item['date'], item['info'], '\n')