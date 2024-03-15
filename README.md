# EU-Law-Summary-Platform: Seamless Human-AI Workflow Management"
"Bridging GenAI and Human Verification for Smarter Workflows."


# Getting Started
### Folder Structure
```
EU-LAW-SUMMARY-PLATFORM/
|
├── .github/  # GitHub specific configurations
│   └── workflows/  # GitHub Actions workflows
│       ├── ci.yml  # Continuous integration workflow
│       └── cd.yml  # Continuous deployment/delivery workflow
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
│
├── llm-preprocessing/  # Data preprocessing, if any
|   ├── Dockerfile
|   ├── script.py  # Preprocessing scripts
|   └── requirements.txt
|
|__ secrets/
    └-- store secrets & env locally inside secrets folder at root level (DO NOT CHECK INTO GITHUB)

```


### Loading the frontend
1. cd into the frontend folder
2. run the following command to install project dependencies
```npm install```
3. after dependencies are installed, use the following command to start the front end dev server:
```npm run start```


### Loading the backend
1. cd into the backend folder
2. run the following to install backend dependencies
```pip install -r requirements.txt```
3. start the backend server with the following command:
```python3 manage.py runserver```
4. Once server is loaded, test the api calls at the following link: http://127.0.0.1:8000/swagger/

### Creating a PR
Example: create a PR against main
Scenario: I am working on a ticket Backend > fix project that needs to fix a bug on main.

Steps:
ensure that local main is up to date with remote main.
create and checkout a new local branch called 'Backend-fix-project' from main.
set local branch name as you see fit. Backend-fix-project is just an example.
commit your code change to Backend-fix-project.
when you are ready to publish your code change and request review, make a PR by
pushing your local branch 'Backend-fix-project' to github and set it to track remote 'origin/Backend-fix-project'.
make sure that main is selected as the base branch, and that the head branch is Backend-fix-project.

```
//assume there's a local 'main' branch that tracks remote main, and
git checkout main
git checkout -b Backend-fix-project
//code stuff
git add .
git commit -m "your commit message"
git push -u origin Backend-fix-project // -u sets remote upstream tracking; pushes local Backend-fix-project to remote `origin`.
```


### docker-compose file
The docker compose file helps the user to deploy the components of nonrtric control panel with one command.
To run docker containers, run the following command:
```shell
docker-compose up
```
To remove docker containers, run the following command:
```shell
docker-compose down
```