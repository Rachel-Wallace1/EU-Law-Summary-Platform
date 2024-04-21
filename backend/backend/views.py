from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponseServerError, JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt
from .documentdb import DocumentdDB

class Database:
    docdb = DocumentdDB()

    @require_http_methods(["GET"])
    def edit(request, celexNumber):
        x = Database.docdb.getSummary(celexNumber)
        
        if x is None:
            raise Http404("No record found")
        
        return JsonResponse(json.loads(x), safe=False)
    
    @require_http_methods(["POST"])
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

        return JsonResponse(json.loads(x), safe=False)
    
    @require_http_methods(["POST"])
    @csrf_exempt
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
    
    @require_http_methods(["GET"])
    def fetchAll(request, page=None):
        if page is None:
            page = 0
        
        summaries = Database.docdb.fetchAll(page)

        return JsonResponse(json.loads(summaries), safe=False)

    @require_http_methods(["POST"])
    @csrf_exempt
    def delete(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        x = Database.docdb.delete(celexNumber)

        return JsonResponse({"Submission status" : x})
    
    @require_http_methods(["GET"])
    def getVersionMetadata(request, celexNumber):
        
        x = Database.docdb.getVersionMetadata(celexNumber)

        return JsonResponse(x, safe=False)
    
    @require_http_methods(["GET"])
    def getVersion(request, celexNumber, version):
        
        x = Database.docdb.getVersion(celexNumber, version)

        return JsonResponse(x, safe=False)

    @require_http_methods(["POST"])
    def editNote(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
            note = json_data["note"]
            version = json_data["version"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        x = Database.docdb.editNote(celexNumber, note, version)

        return JsonResponse(json.loads(x), safe=False)

    #Annotations
    @require_http_methods(["POST"])
    def submitAnnotation(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
            annotation = json_data["annotation"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        x = Database.docdb.submitAnnotation(celexNumber, annotation)

        return JsonResponse({"Annotation submission status" : x})
    
    @require_http_methods(["POST"])
    def updateAnnotation(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
            annotation = json_data["annotation"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        x = Database.docdb.updateAnnotation(celexNumber, annotation)

        return JsonResponse({"Annotation submission status" : x})

    @require_http_methods(["GET"])
    def fetchAnnotations(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        annotations = Database.docdb.fetchAnnotations(celexNumber)

        return JsonResponse(json.loads(annotations), safe=False)
    
    @require_http_methods(["POST"])
    def deleteAnnotation(request):
        json_data = json.loads(request.body)

        try:
            annotationId = json_data["id"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        x = Database.docdb.deleteAnnotation(annotationId)

        return JsonResponse({"Annotation deletion status" : x})
    
    require_http_methods(["POST"])
    def deleteAllAnnotations(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
        except KeyError:
            HttpResponseServerError("Malformed data in request")

        x = Database.docdb.deleteAllAnnotations(celexNumber)

        return JsonResponse({"Annotation deletion status" : x})
    
class Health:
    def health(request):
        return HttpResponse("OK")