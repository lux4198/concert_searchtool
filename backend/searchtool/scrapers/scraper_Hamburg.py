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
                Role = role.get_text(strip = True)
        # add musicians + role to each event + add conductor as special key 
        if Role == 'Dirigent':
            singleevent['conductor'] = Musician
        singleevent['musicians'][Musician] = Role
    

    # get Pieces and Composers 
    # finds the div that contains this concerts program 
    for div in soup.find_all('div', {'class' : 'cell medium-6'})[:3]:
        content = [content.get_text(strip = True) for content in div.contents if content.get_text(strip = True) != '']
        if content[0] != 'Programm':
            continue
        else:
            composers_pieces = div

    # gets the paragraphs with each composer + pieces from above mentioned div
    paragraphs = [paragraphs for paragraphs in composers_pieces.find_all('p')]
    
    # long list comprehension -> checks every paragraph in composers_pieces div -> extracts the text and strips it of line breaks etc
    # -> does not accept empty strings or -pause-, if paragraph does not contain program, but e.g. 'Einfuehrung', it is not accepted
    composers_and_pieces = [[piece.get_text(strip = True) for piece in paragraph.contents if piece.get_text(strip = True) != '' 
                and piece.get_text(strip = True) != '- Pause -'] for paragraph in paragraphs if paragraph.contents[1].get_text(strip = True) != 'Einführung']

    # extracts composers and pieces from the program 
    composers = [composers[0] for composers in composers_and_pieces if composers]
    pieces = [pieces[1:] for pieces in composers_and_pieces if pieces]

    singleevent['composers'] = composers
    singleevent['pieces'] = pieces 

    print(singleevent, '\n')

    