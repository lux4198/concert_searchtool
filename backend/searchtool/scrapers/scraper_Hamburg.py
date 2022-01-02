import requests
from bs4 import BeautifulSoup

data = requests.get('https://www.elbphilharmonie.de/de/programm/EPHH/OR/')
soup = BeautifulSoup(data.text, 'html.parser')


for event in soup.find_all('div', {'class' : 'grid-x grid-margin-x'}):

    # get link to each specific concert for details 
    concert_link = event.find('a', href = True)
    concert_link = 'https://www.elbphilharmonie.de/' + concert_link['href']
    
    data = requests.get(concert_link)
    soup = BeautifulSoup(data.text, 'html.parser')

    # get datetime of concert from header
    date = soup.find('time')['datetime']

    