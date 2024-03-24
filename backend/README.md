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

2. Port forward ssh

Set the system environment variables in the bin/activate file

```shell
export mongouser='xx'
export mongopass='xx'

export mongolocal='127.0.0.1:27017'

export mongoquerystringlocal='tls=true&tlsCAFile=backend/global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&tlsInsecure=true&directConnection=true'

export ec2instance='ssm-user@xxxx.compute-1.amazonaws.com'
export docdbinstance='27017:xxxxx.xxxx.us-east-1.docdb.amazonaws.com:27017'

```

and then make sure you have the key available

```shell
ssh -i "path/to/ky/ec2 ssh.pem" -L $docdbinstance $ec2instance -N
```

3. Run python server

```shell
python3 manage.py runserver
```

4. Run the post api to generate a summary:
```shell
curl -X POST http://localhost:8000/api/summaries/openai/ -H "Content-Type: application/json" -d '{"input_message": "hello"}'

```
