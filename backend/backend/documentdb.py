import pymongo
import os

mongouser = os.getenv('mongouser')
mongopass = os.getenv('mongopass')
mongoinstance = os.getenv('mongoinstance')

class DocumentdDB:
    def __init__(self):
        ##Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set and specify the read preference as secondary preferred
        self.client = pymongo.MongoClient('mongodb://{}:{}@{}/?tls=true&tlsCAFile=backend/global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false'.format(mongouser, mongopass, mongoinstance))

        ##Specify the database to be used
        self.db = self.client.eulaw

    def insertSummary(self, celexNumber, summary):
        ##Specify the collection to be used
        col = self.db.summaries

        ##Insert a single document
        col.insert_one({"celexNumber" : celexNumber, "summary" : summary})

    def getSummary(self, celexNumber):
        ##Specify the collection to be used
        col = self.db.summaries

        ##Find the json object with the same celexNumber
        ##(technically just finds the first law with the Id)
        return col.find_one({"celexNumber" : celexNumber})["summary"]