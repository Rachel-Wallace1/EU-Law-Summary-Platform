from django.test import TestCase
from django.urls import reverse

from backend.views import Database
from django.contrib.auth import get_user_model
from dotenv import load_dotenv
import os

load_dotenv()


User = get_user_model()

class ApplicationTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        test_user1 = User.objects.create_user(username='testuser1@test.com', password='testuser1password')
        test_user1.save()

        celexNumber = 'celexTest'
        title = 'titleTest'
        summary = 'summaryTest'
        Database.docdb.insertSummary(celexNumber, title, summary)

    def test_fetch(self):
        response = self.client.get(reverse('fetchAll'))
        self.assertEqual(response.status_code, 200)
        res = response.json()
        self.assertEqual(type(res), list)
        if res:
            attrs = set(res[0].keys())
            self.assertEqual(attrs, set(['celexNumber', 'title', 'status', 'owner', 'current']))

    def test_delete(self):        
        response = self.client.post('/api/delete/celexTest')
        self.assertEqual(response.status_code, 200)

    def test_edit(self):        
        response = self.client.get('/api/edit/celexTest')
        self.assertEqual(response.status_code, 200)
    
    def test_version(self):        
        response = self.client.get('api/summary/celexTest/versions')
        self.assertEqual(response.status_code, 200)

    def test_summary_openai(self):
        url = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=LEGISSUM:4622237'
        token = os.getenv('OPEN_AI_TOKEN')
        data = {'apiToken': token, 'input_message': url}
        response = self.client.post(reverse('openai_chat_api_post'), data)
        self.assertEqual(response.status_code, 201)

    
    def test_signup_1(self):
        data = {'email': 'test@test.com',
                'password': 'test123#',
                'first_name': 'firstTest',
                'last_name': 'lastTest',
        }
        response = self.client.post(reverse('signup'), data)
        self.assertEqual(response.status_code, 201)

    def test_signup_2(self):
        data = {'email': '',
                'password': '',
                'first_name': 'firstTest',
                'last_name': 'lastTest',
        }
        response = self.client.post(reverse('signup'), data)
        self.assertEqual(response.status_code, 400)

    def test_login_1(self):
        data = {'email': 'testuser1@test.com',
                'password': 'testuser1password' }
                
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, 401)
        

    

    