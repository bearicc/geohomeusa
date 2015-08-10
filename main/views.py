from django.shortcuts import render, redirect
from django.contrib.auth.models import User


def home(request):
    return render(request, 'index.html')


def aboutus(request):
    return render(request, 'aboutus.html')


def signup(request):
    if request.method == 'POST':
        name = request.POST['name']
        password = request.POST['password']
        User.objects.create_user(name, '', password)
        return redirect('/')

    return render(request, 'signup.html')
