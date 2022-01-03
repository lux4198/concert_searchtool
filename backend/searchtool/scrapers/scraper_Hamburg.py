import requests, re
from bs4 import BeautifulSoup

data = requests.get('https://www.elbphilharmonie.de/de/programm/EPHH/OR/')
soup = BeautifulSoup(data.text, 'html.parser')

concerts = []
for event in soup.find_all('div', {'class' : 'grid-x grid-margin-x'}):

    singleevent = {}

    # get link to each specific concert for details 
    concert_link = event.find('a', href = True)
    concert_link = 'https://www.elbphilharmonie.de/' + concert_link['href']
    
    # get data from details link 
    data = requests.get(concert_link)
    soup = BeautifulSoup(data.text, 'html.parser')

    # get datetime of concert from header
    date = soup.find('time')['datetime']
    singleevent['datetime'] = date

    # get musicians and roles 
    singleevent['musicians'] = {}
    musicians = soup.find_all('p', {'class' : 'artists without-space'})

    for musician in musicians:
        # musician / conductor always highlighted in bold text
        Musician = musician.find('b').text

        # other text in div is musicians role 
        for role in musician.contents:
            if role.text != Musician: 
                Role = role.text
        # add musicians + role to each event  
        singleevent['musicians'][Musician] = Role
    

    