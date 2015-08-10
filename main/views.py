from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as login_, logout as logout_
from django.contrib.auth.decorators import login_required


def home(request):
    user = None
    if request.user.is_authenticated():
        user = request.user
        print(user.username)
    return render(request, 'index.html', {'user': user})


def aboutus(request):
    return render(request, 'aboutus.html')


def login(request):
    if request.method == 'POST':
        name = request.POST['name']
        password = request.POST['password']
        user = authenticate(username=name, password=password)
        if user is not None:
            if user.is_active:
                print("Active")
                login_(request, user)
            else:
                print("Not active")
            return redirect('/')
        else:
            print("Incorrect")

    return render(request, 'login.html')


@login_required
def logout(request):
    logout_(request)
    return redirect('/')


def signup(request):
    if request.method == 'POST':
        name = request.POST['name']
        password = request.POST['password']
        User.objects.create_user(name, '', password)
        user = authenticate(username=name, password=password)
        login_(request, user)
        return redirect('/')
    return render(request, 'signup.html')
