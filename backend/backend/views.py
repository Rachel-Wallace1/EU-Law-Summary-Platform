from django.shortcuts import render

from .documentdb import DocumentdDB

class Database:
    docdb = DocumentdDB()

    def edit(request, celexNumber):
        x = Database.docdb.getSummary("exampleValue")
        
        return render(request, "edit.html", {"summary":x})