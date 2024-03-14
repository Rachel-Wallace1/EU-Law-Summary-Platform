# Backend Container


- Install Django backend here

# Dependencies to install
```pip install -r requirements.txt```

# Commands to get started:
```python3 manage.py runserver```


# Current process to run llm

1. Export api key 
For openai running on azure:
```shell
export AZURE_OPENAI_API_KEY="<your key>"
export AZURE_OPENAI_ENDPOINT="https://east2-eu-law-project.openai.azure.com/"
```

2. Run python server

```shell
python3 manage.py runserver
```

3. Run the post api to generate a summary:
```shell
curl -X POST http://localhost:8000/api/summaries/openai/ -H "Content-Type: application/json" -d '{"input_message": "hello"}'

```
