# Backend Container


- Install Django backend here

# Dependencies to install
```pip install -r requirements.txt```

# Commands to get started:
```python3 manage.py runserver```


# Current process to run llm

1. Port forward ssh

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

2. Run python server

```shell
python3 manage.py runserver
```



# Testing Production Build Commands
Before committing your code to the main branch, it's good to test it using the following production build commands:

### Disable DEBUG Mode:

In your settings.py file, set 
```bash
DEBUG = False
```
It's important to avoid committing code with DEBUG = True, as this can pose security risks in a production environment.

### Collect Static Files:

Execute the command 
```bash
python3 manage.py collectstatic
```
to collect all static files from your Django project into one location. This is necessary for serving static files efficiently in a production environment.


### Launch the Gunicorn server 
Using the command 
```bash
gunicorn backend.wsgi:application
```
 This command will start the Gunicorn server, which serves your Django application. Make sure to replace backend with the name of your Django project if it's different.


Make sure not to commit the static files to main branch, you can remove them locally.

