from django.shortcuts import render
from django.http import Http404, HttpResponseServerError, JsonResponse

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
            status = json_data["status"]
            updatedSummary = json_data["summary"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        x = Database.docdb.updateSummary(celexNumber, author, status, updatedSummary)

        return render(request, "success.html", {"updatedSummary" : x})
    
    def submit(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
            title = json_data["title"]
            summary = json_data["summary"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        Database.docdb.insertSummary(celexNumber, title, summary)

        return JsonResponse({"updatedSummary" : "nice submission"})
    
    def fetchAll(request, page=None):
        if page is None:
            page = 0
        
        summaries = Database.docdb.fetchAll(page)

        return JsonResponse(json.loads(summaries), safe=False)