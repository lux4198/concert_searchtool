from .scrapers.scraper_Berlin import main as berlin_main
from  .scrapers.scraper_Hamburg import main as hamburg_main
from .models import Event 

# this script updates the database by deleting current entries and replacing them with new ones from the scraper scripts 

def main():
    Event.objects.all().delete()
    berlin_main()
    hamburg_main()

if __name__ == '__main__':
    main()