from django.shortcuts import render
from django.http import Http404, HttpResponseServerError

import json

from .documentdb import DocumentdDB

class Database:
    docdb = DocumentdDB()

    def edit(request, celexNumber):
        x = Database.docdb.getSummary(celexNumber)
        
        if x is None:
            raise Http404("No record found")
        
        return render(request, "edit.html", {"summary":x})
    
    def updateSummary(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
            author = json_data["author"]
            updatedSummary = json_data["summary"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        x = Database.docdb.updateSummary(celexNumber, author, updatedSummary)

        return render(request, "success.html", {"updatedSummary" : x})
    
    def submit(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
            summary = json_data["summary"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        Database.docdb.insertSummary(celexNumber, summary)

        return render(request, "success.html", {"updatedSummary" : "nice submission"})