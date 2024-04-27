import pymongo
import os
import datetime
from bson.json_util import dumps

mongouser = os.getenv('mongouser')
mongopass = os.getenv('mongopass')
# mongoinstance = os.getenv('mongoinstance')
mongoinstance = os.getenv('mongolocal')
# mongoquerystring = os.getenv('mongoquerystring')
mongoquerystring = os.getenv('mongoquerystringlocal')

class DocumentdDB:
    def __init__(self):
        #Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set and specify the read preference as secondary preferred
        self.client = pymongo.MongoClient('mongodb://{}:{}@{}/?{}'.format(mongouser, mongopass, mongoinstance, mongoquerystring))

        #Specify the database to be used
        self.db = self.client.eulaw

    def insertSummary(self, celexNumber, title, summary, category):
        #Specify the collection to be used
        col = self.db.summaries

        #Insert a single document
        col.insert_one(
            {
                "celexNumber" : celexNumber,
                "title" : title,
                "status" : "New",
                "owner" : "",
                "category" : category,
                "current" : {
                    "v" : 1,
                    "author" : "LegalBot",
                    "notes" : "",
                    "timestamp" : datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
                    "summary" : summary
                },
                "prev" : []
            }
        )

    def updateSummary(self, celexNumber, author, status, updatedSummary):
        col = self.db.summaries

        #Fetch the entire json doc
        doc = col.find_one({"celexNumber" : celexNumber})

        #Increment the version number
        newVersion = int(doc["current"]["v"]) + 1

        #Move the previous current summary to the prev list
        doc["prev"].append(doc["current"])

        #Update the status if changed
        doc["status"] = status
        
        doc["current"] = {
            "v"  : newVersion,
            "author" : author,
            "notes" : "",
            "timestamp" : datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
            "summary" : updatedSummary
        }

        #Insert the updated document
        result = col.replace_one({"celexNumber" : celexNumber}, doc)
        
        if result.modified_count != 1:
            print("Update unsuccesful")

        #Return the new document
        return self.getSummary(celexNumber)


    def getSummary(self, celexNumber):
        #Specify the collection to be used
        col = self.db.summaries

        #Find the json object with the same celexNumber
        #(technically just finds the first law with the Id)
        summary = col.find_one({"celexNumber" : celexNumber}, {"_id" : 0, "celexNumber" : 1, "title" : 1, "owner" : 1, "category" : 1, "notes" : 1, "current" : 1})

        if summary is None:
            return None
        
        return dumps(summary)

    def fetchAll(self, page, category):
        #Specify the collection to be used
        col = self.db.summaries

        #For pagination we may want to skip some pages of results
        numberToSkip = 10 * page

        if category is None:
            summaries = col.find({}, {"_id" : 0, "celexNumber" : 1, "title" : 1, "owner" : 1, "category" : 1, "current.timestamp" : 1, "status" : 1}, skip=numberToSkip, limit=10)
        else:
            summaries = col.find({"category" : category}, {"_id" : 0, "celexNumber" : 1, "title" : 1, "owner" : 1, "category" : 1, "current.timestamp" : 1, "status" : 1}, skip=numberToSkip, limit=10)
        
        #Dump is used to convert it from the pymongo cursor to a json dict
        return dumps(summaries)

    def delete(self, celexNumber):
        #Specify the collection to be used
        col = self.db.summaries

        result = col.delete_one({"celexNumber" : celexNumber})

        if result.acknowledged != True:
            return "Deletion unsuccessful"

        return "Deletion successful"


    def getVersionMetadata(self, celexNumber):
        #Specify the collection to be used
        col = self.db.summaries

        #Find the json object with the same celexNumber
        #(technically just finds the first law with the Id)
        summaries = col.find_one({"celexNumber" : celexNumber}, {"_id" : 0, "celexNumber" : 1, "current.v" : 1, "current.author" : 1, "current.timestamp" :  1, "prev.v" : 1, "prev.author" : 1, "prev.timestamp" : 1})
        
        # Create a new dict to return
        versionMetada = {"celexNumber" : celexNumber}
        versionMetada["versions"] = list()

        #Add the current version info as the first entry
        versionMetada["versions"].append(summaries["current"])

        #Sort in desencding order by version number for previous versions
        versionMetada["versions"].extend(sorted(summaries["prev"], key=lambda d: d['v'], reverse=True))

        #Provide the count of versions
        versionMetada["count"] = len(versionMetada["versions"])

        return versionMetada

    def getVersion(self, celexNumber, version):
        #Specify the collection to be used
        col = self.db.summaries

        #Find the json object with the same celexNumber and version
        #(technically just finds the first law with the Id)
        summary = col.find_one({"celexNumber" : celexNumber}, {"_id" : 0, "celexNumber" : 1, "current" : 1, "prev.v" : 1, "prev.author" : 1, "prev.notes" : 1, "prev.timestamp" : 1, "prev.summary" : 1})
        
        #Create a new dict to return
        versionSummary = {"celexNumber" : celexNumber }

        #Merge it with the dict containing the version summary info
        if version == summary["current"]["v"]:
            versionSummary.update(summary["current"])
        else:
            versionSummary.update(
                next((item for item in summary["prev"] if item['v'] == version), None)
            )

        return versionSummary

    
    def editNote(self, celexNumber, note, status):
        #Specify the collection to be used
        col = self.db.summaries

        #Find the json object with the same celexNumber and version
        #(technically just finds the first law with the Id)
        summary = col.find_one({"celexNumber" : celexNumber})
        
        #Set the notes field for the specified version
        summary["current"]["notes"] = note
        summary["status"] = status

        #Insert the updated document
        result = col.replace_one({"celexNumber" : celexNumber}, summary)
        
        if result.modified_count != 1:
            print("Update unsuccesful")

        #Return the new document
        return self.getSummary(celexNumber)
        
    #Annotations endpoints

    def submitAnnotation(self, celexNumber, annotation):
        #Specify the collection to be used.
        #Want to use a different collection than the
        #one that is used for the summaries
        col = self.db.annotations

        #Add the celexNumber
        annotation["celexNumber"] = celexNumber

        #Insert the annotation
        result = col.insert_one(annotation)

        if result.acknowledged != True:
            return "failure"

        return "success"
    
    def updateAnnotation(self, celexNumber, annotation):
        #Specify the collection to be used.
        col = self.db.annotations

        #Add the celexNumber
        annotation["celexNumber"] = celexNumber

        #Insert the updated annotation
        result = col.replace_one({"id" : annotation["id"]}, annotation)

        if result.acknowledged != True:
            return "failure"

        return "success"

    def fetchAnnotations(self, celexNumber):
        #Specify the collection to be used.
        col = self.db.annotations

        #Find all annotations with the same celexNumber field
        annotations = col.find({"celexNumber" : celexNumber}, {"_id" : 0})

        #Dump is used to convert it from the pymongo cursor to a json dict
        return dumps(annotations)
    
    def deleteAnnotation(self, annotationId):
        #Specify the collection to be used.
        col = self.db.annotations
        
        #Delete specific annotation
        result = col.delete_one({"id" : annotationId})

        if result.acknowledged != True:
            return "Deletion unsuccessful"
    
        return "Deletion successful"
    
    def deleteAllAnnotations(self, celexNumber):
        #Specify the collection to be used.
        col = self.db.annotations

        #Delete all annotations with the same celexNumber field
        result = col.delete_many({"celexNumber" : celexNumber})

        if result.acknowledged != True:
            return "Deletion unsuccessful"
    
        return "Deletion successful"