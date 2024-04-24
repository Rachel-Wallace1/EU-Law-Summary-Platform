
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse,parse_qs

def check_url_content(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:

            soup = BeautifulSoup(response.content, 'html.parser')

            return soup

        else:
            print("Failed to fetch content from the URL. Status code:", response.status_code)
    except requests.exceptions.RequestException as e:
        print("Error occurred while fetching content:", e)

def get_celex(url):
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    celex_number = query_params.get('uri')
    
    if celex_number:
        celex_number_str = celex_number[0]
        celex_number2 = celex_number_str.replace("CELEX:", "")

        return celex_number2
    else:
        return None

def get_text_content(content):
    text_content = content.get_text()
    return text_content