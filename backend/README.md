# Backend Container


- Install Django backend here


# Dependencies to install
```pip install -r requirements.txt```

# Commands to get started:
```python3 manage.py runserver```


# Current process to connect to DBs

The two databases that are used are DocumentDB and Postgres. They are both hosted on AWS, and as a result, the only way to connect to them is on an ec2 instance. If you would like to run the code on an ec2 instance, then you can do so and perform testing in the cloud.

Alternatively, if development is to be done locally then it is possible to port forward from a development computer to an ec2 instance with access to the databases.

In `documentdb.py` you can comment out the `mongoinstance` and `mongoquerystring` lines depending on if you are doing development locally or if the code is running on ec2

1. Port forward ssh

Set the system environment variables in the bin/activate file for your python venv. This makes it so you dont have to set them each time manually.

they should look roughly like this:
```shell
export mongouser='xx'
export mongopass='xx'

export mongoinstance='docdb-xxxx.us-east-1.docdb.amazonaws.com:27017'
export mongolocal='127.0.0.1:27017'

export mongoquerystring='tls=true&tlsCAFile=backend/global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false'
export mongoquerystringlocal='tls=true&tlsCAFile=backend/global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false&tlsInsecure=true&directConnection=true'

export ec2instance='ssm-user@xxxx.compute-1.amazonaws.com'
export docdbinstance='27017:xxxxx.xxxx.us-east-1.docdb.amazonaws.com:27017'
export rdsinstance='5432:user-accounts-database.xxxxxx.us-east-1.rds.amazonaws.com:5432'
```

You will also need 2 files [configured according to the Django documentation](https://docs.djangoproject.com/en/4.0/ref/databases/#postgresql-connection-settings) to connenct to postgres database.

Those being:

`.pg_service.conf` which lives in your `$HOME` directory

```shell
[db_service]
host=localhost
user=postgres
dbname=postgres
port=5432
```
and `.my_pgpass` which lives in the `/backend/` folder of this project

```shell
localhost:5432:postgres:postgres:<password>
```

and then make sure you have your ssh key available to log into the ec2 instance.

In two seperate terminal windows, start these commands. They should hang once they are connected to the ec2 instance

```shell
ssh -i "path/to/ky/ec2 ssh.pem" -L $docdbinstance $ec2instance -N
```

```shell
ssh -i "path/to/ky/ec2 ssh.pem" -L $rdsinstance $ec2instance -N
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

