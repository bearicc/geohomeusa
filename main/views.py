from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as login_, logout as logout_
from django.contrib.auth.decorators import login_required
from uuid import uuid4
from urllib import parse
import requests
import requests.auth


def home(request):
    user = None
    if request.user.is_authenticated():
        user = request.user

    error = request.GET.get('error', '')
    if error:
        return "Error: " + error
    state = request.GET.get('state', '')
    if not is_valid_state(state):
        print(state)
    code = request.GET.get('code', '')
    token = '123'
    if code:
        token = get_token(code)
        # openid = get_openid(token)
        # print("openid: "+openid)

    return render(request, 'index.html', {'user': user, 'openid': token})


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


def save_created_state(state):
    pass


def is_valid_state(state):
    return True


def qq_login(request):
    state = str(uuid4())
    save_created_state(state)
    params = {'response_type': 'code',
              'client_id': '101242194',
              'redirect_uri': 'http://www.bearicc.com',
              'state': state,
              'scope': 'do_like'}
    qq_url = "https://graph.qq.com/oauth2.0/authorize?" + parse.urlencode(params)

    return redirect(qq_url)


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


def get_token(code):
    CLIENT_ID = '101242194'
    CLIENT_SECRET = '009b1a427fcec815ad746d189cf67159'
    REDIRECT_URI = 'http://www.bearicc.com'
    headers = {'grant_type': 'authorization_code',
               'client_id': CLIENT_ID,
               'client_secret': CLIENT_SECRET,
               'code': code,
               'redirect_uri': REDIRECT_URI}
    response = requests.get('https://graph.qq.com/oauth2.0/token', headers)
    import json
    # token_json = response.json()
    token_json = json.load(response)
    return token_json["access_token"]


def get_openid(access_token):
    headers = {"access_token": access_token}
    response = requests.get('https://graph.qq.com/oauth2.0/me', headers=headers)
    me_json = response.json()
    return me_json['openid']


def get_user_info(access_token, openid):
    headers = {"Authorization": "bearer " + access_token}
    response = requests.get('https://graph.qq.com/oauth2.0/me', headers=headers)
    me_json = response.json()
    return me_json['openid']
