import pymongo
import os
import datetime

mongouser = os.getenv('mongouser')
mongopass = os.getenv('mongopass')
# mongoinstance = os.getenv('mongoinstance')
mongoinstance = os.getenv('mongolocal')
# mongoquerystring = os.getenv('mongoquerystring')
mongoquerystring = os.getenv('mongoquerystringlocal')

class DocumentdDB:
    def __init__(self):
        ##Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set and specify the read preference as secondary preferred
        self.client = pymongo.MongoClient('mongodb://{}:{}@{}/?{}'.format(mongouser, mongopass, mongoinstance, mongoquerystring))

        ##Specify the database to be used
        self.db = self.client.eulaw

    def insertSummary(self, celexNumber, summary):
        ##Specify the collection to be used
        col = self.db.summaries

        ##Insert a single document
        col.insert_one(
            {
                "celexNumber" : celexNumber,
                "current" : {
                    "v" : 1,
                    "author" : "LegalBot",
                    "timestamp" : datetime.datetime.now(),
                    "summary" : summary
                },
                "prev" : []
            }
        )

    def updateSummary(self, celexNumber, author, updatedSummary):
        col = self.db.summaries

        #Fetch the entire json doc
        doc = col.find_one({"celexNumber" : celexNumber})

        #Increment the version number
        newVersion = str(int(doc["current"]["v"]) + 1)

        doc["prev"].append(doc["current"])

        doc["current"] = {
            "v"  : newVersion,
            "author" : author,
            "timestamp" : datetime.datetime.now(),
            "summary" : updatedSummary
        }

        result = col.replace_one({"celexNumber" : celexNumber}, doc, upsert=True)
        
        if result.modified_count is 1:
            print("Update worked")

        return col.find_one({"celexNumber" : celexNumber})


    def getSummary(self, celexNumber):
        ##Specify the collection to be used
        col = self.db.summaries

        ##Find the json object with the same celexNumber
        ##(technically just finds the first law with the Id)
        summary = col.find_one({"celexNumber" : celexNumber})

        if summary is None:
            return None
        
        return summary["current"]["summary"]