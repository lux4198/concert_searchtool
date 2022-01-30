from .scrapers.scraper_Berlin import main as berlin_main
from  .scrapers.scraper_Hamburg import main as hamburg_main
from .scrapers.scraper_Munich import main as munich_main
from .scrapers.scraper_Frankfurt import main as frankfurt_main
from .scrapers.scraper_Dresden import main as dresden_main

from .models import Event 

# this script updates the database by deleting current entries and replacing them with new ones from the scraper scripts 

def main():
    Event.objects.all().delete()
    berlin_main()
    hamburg_main()
    munich_main()
    frankfurt_main()
    dresden_main()

if __name__ == '__main__':
    main()