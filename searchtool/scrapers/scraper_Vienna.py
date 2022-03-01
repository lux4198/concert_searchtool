import requests
from bs4 import BeautifulSoup
from datetime import datetime 
# from ..models import Event
import pytz
import ssl
import certifi

# cafile = certifi.where()
# with open('wien_CA_certificate.pem', 'rb') as infile:
#     customca = infile.read()
# with open(cafile, 'ab') as outfile:
#     outfile.write(customca)


dir = r'C:\Users\lukas\AppData\Local\Programs\Python\Python39\lib\site-packages\certifi\wien_CA_certificate.pem'

data = requests.get('https://www.wienersymphoniker.at')   
soup = BeautifulSoup(data.text, 'html.parser')

print('')

# for item in soup.find_all('article', {'class' : "views-row views-row-1 views-row-odd views-row-first"}):
#     print(item.text, 'a')




