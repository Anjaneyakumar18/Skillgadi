from django.shortcuts import render
from django.http import JsonResponse
from openai import OpenAI
import json
from django.views.decorators.csrf import csrf_exempt

client = OpenAI(
    api_key=
)

def home(request):
    return render(request, "index.html")

@csrf_exempt
def generate(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_input = data.get("prompt")
        print(f'User Input is : {user_input}')
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input}
            ]
        )

        return JsonResponse({
            "result": response.choices[0].message.content
        })

    return JsonResponse({"error": "Invalid request"}, status=400)
