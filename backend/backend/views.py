from django.http import Http404, HttpResponse, HttpResponseServerError, JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt
from .documentdb import DocumentdDB
from django.middleware.csrf import get_token

class Main:
    def csrf(request):
        get_token(request)
        return JsonResponse({'csrfToken': get_token(request)})

class Database:
    docdb = DocumentdDB()

    categories = [
        'agriculture',
        'audiovisual-and-media',
        'budget',
        'competition',
        'consumers',
        'culture',
        'customs',
        'development',
        'economic-and-monetary-affairs',
        'energy',
        'enlargement',
        'enterprise',
    ]

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
            return HttpResponseServerError("Malformed data in request")

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
            category = json_data["category"]
            subcategory = json_data["subcategory"]
        except KeyError:
            return HttpResponseServerError("Malformed data in request")

        if category not in Database.categories:
            return HttpResponseServerError("Not a valid category")

        Database.docdb.insertSummary(celexNumber, title, summary, category, subcategory)

        return JsonResponse({"updatedSummary" : "nice submission"})
    
    @require_http_methods(["GET"])
    def fetchAll(request):
        page = int(request.GET.get('page', 0))
        category = request.GET.get('category')
        subcategory = request.GET.get('subcategory')

        if category is not None and category not in Database.categories:
            return HttpResponseServerError("Not a valid category")

        summaries = Database.docdb.fetchAll(page, category, subcategory)

        return JsonResponse(json.loads(summaries), safe=False)

    @require_http_methods(["POST"])
    @csrf_exempt
    def delete(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
        except KeyError:
            return HttpResponseServerError("Malformed data in request")

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
            status = json_data["status"]
        except KeyError:
            return HttpResponseServerError("Malformed data in request")

        x = Database.docdb.editNote(celexNumber, note, status)

        return JsonResponse(json.loads(x), safe=False)

    #Annotations
    @require_http_methods(["POST"])
    def submitAnnotation(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
            annotation = json_data["annotation"]
        except KeyError:
            return HttpResponseServerError("Malformed data in request")

        x = Database.docdb.submitAnnotation(celexNumber, annotation)

        return JsonResponse({"Annotation submission status" : x})
    
    @require_http_methods(["POST"])
    def updateAnnotation(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
            annotation = json_data["annotation"]
        except KeyError:
            return HttpResponseServerError("Malformed data in request")

        x = Database.docdb.updateAnnotation(celexNumber, annotation)

        return JsonResponse({"Annotation submission status" : x})

    @require_http_methods(["GET"])
    def fetchAnnotations(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
        except KeyError:
            return HttpResponseServerError("Malformed data in request")

        annotations = Database.docdb.fetchAnnotations(celexNumber)

        return JsonResponse(json.loads(annotations), safe=False)
    
    @require_http_methods(["POST"])
    def deleteAnnotation(request):
        json_data = json.loads(request.body)

        try:
            annotationId = json_data["id"]
        except KeyError:
            return HttpResponseServerError("Malformed data in request")

        x = Database.docdb.deleteAnnotation(annotationId)

        return JsonResponse({"Annotation deletion status" : x})
    
    require_http_methods(["POST"])
    def deleteAllAnnotations(request):
        json_data = json.loads(request.body)

        try:
            celexNumber = json_data["celexNumber"]
        except KeyError:
            return HttpResponseServerError("Malformed data in request")

        x = Database.docdb.deleteAllAnnotations(celexNumber)

        return JsonResponse({"Annotation deletion status" : x})
    
class Health:
    def health(request):
        return HttpResponse("OK")