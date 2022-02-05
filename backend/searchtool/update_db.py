from .scrapers.scraper_Berlin import main as berlin_main
from  .scrapers.scraper_Hamburg import main as hamburg_main
from .scrapers.scraper_Munich import main as munich_main
from .scrapers.scraper_Frankfurt import main as frankfurt_main
from .scrapers.scraper_Dresden import main as dresden_main

from .models import Event 
from itertools import chain

def create_Events(item):
    Event.objects.create(
            date = item['datetime'], 
            city = item['city'], 
            ensemble = item['ensemble'], 
            musicians = item['musicians'], 
            conductor = item['conductor'],
            composers = item['composers'],
            pieces = item['pieces'],
            link = item['link'])

# this script updates the database by deleting current entries and replacing them with new ones from the scraper scripts 

def main():
    cities = [berlin_main(), hamburg_main(), munich_main(), frankfurt_main(), dresden_main()]

    Event.objects.all().delete()

    for item in chain.from_iterable(cities):
        if '' in [item['composers'], item['musicians'], item['pieces']]:
            continue
        create_Events(item)

if __name__ == '__main__':
    main()