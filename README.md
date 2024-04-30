# EU-Law-Summary-Platform: Seamless Human-AI Workflow Management"
"Bridging GenAI and Human Verification for Smarter Workflows."

# Getting Started
- Developer Installation Manual [Frontend](frontend/README.md), [Backend](backend/README.md), [Docker](docs/docker.md)
- System Installation Manual: [Here](terraform/README.md)
- User Manual: [Here](docs/user.md)


### Folder Structure
```
EU-LAW-SUMMARY-PLATFORM/
|
├── .github/  # GitHub specific configurations
│   └── workflows/  # GitHub Actions workflows
│
├── docker-compose.yml  # Docker compose file to orchestrate containers
│
├── frontend/  # React frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/  # React pages
│   │   ├── app.js
│   │   └── index.js
│   └── public/
│       └── index.html
│
├── backend/  # Django backend
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   ├── backend/  # Django project folder
│   │   ├── settings.py
│   │   ├── urls.py
|   |   |-- wsgi.py
│   │   └── asgi.py
│   └── accounts/  # Django app folder
│       ├── migrations/
│       ├── models.py
│       ├── views.py        #log in/out, document api logic
│       └── serializers.py  #create new user logic
│
├── llm-model/  # Large Language Model (e.g., OpenAI API integration)
│   ├── Dockerfile
│   ├── model.py  # Integration with OpenAI's API
│   └── requirements.txt
|
|__ secrets/
    └-- store secrets & env locally inside secrets folder at root level (DO NOT CHECK INTO GITHUB)

```