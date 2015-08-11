from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as login_, logout as logout_
from django.contrib.auth.decorators import login_required
from uuid import uuid4
from urllib import parse
from urllib.parse import parse_qs
import requests
import requests.auth
from copy import deepcopy
from lib import random_string


def home(request):
    user = None
    user_info = None
    if request.user.is_authenticated():
        user = request.user
    else:
        error = request.GET.get('error', '')
        if error:
            return "Error: " + error
        state = request.GET.get('state', '')
        if not is_valid_state(state):
            print(state)
        code = request.GET.get('code', '')
        openid = ''
        if code:
            token_json = get_token_json(code)
            if not token_json.get('error'):
                openid = get_openid(token_json.get('access_token'))
                qq_login_data = {
                    'access_token': token_json['access_token'],
                    'oauth_consumer_key': '101242194',
                    'openid': openid}
                user_info = get_user_info(qq_login_data)
                username = user_info.get('nickname')
                user = User.objects.filter(username=username)
                if not user:
                    password = random_string(10)
                    User.objects.create_user(username, '', password)
                else:
                    password = user[0].password
                user = authenticate(username=username, password=password)
                login_(request, user)

    return render(request, 'index.html', {'user': user, 'user_info': user_info})


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


def get_token_json(code):
    CLIENT_ID = '101242194'
    CLIENT_SECRET = '009b1a427fcec815ad746d189cf67159'
    REDIRECT_URI = 'http://www.bearicc.com'
    headers = {'grant_type': 'authorization_code',
               'client_id': CLIENT_ID,
               'client_secret': CLIENT_SECRET,
               'code': code,
               'redirect_uri': REDIRECT_URI}
    response = requests.get('https://graph.qq.com/oauth2.0/token', headers)
    token_json = {k: v[0] for k, v in parse_qs(response.text).items()}
    return token_json


def get_openid(access_token):
    headers = {'access_token': access_token}
    response = requests.get('https://graph.qq.com/oauth2.0/me', headers)
    s = response.text
    import ast
    me_json = ast.literal_eval(s[s.index('{'):s.index('}')+1])
    openid = me_json.get('openid')
    if not openid:
        openid = me_json.get('OPENID')
    return openid


def get_user_info(qq_login_data):
    headers = qq_login_data
    response = requests.get('https://graph.qq.com/user/get_user_info', headers)
    user_info = response.json()
    return user_info
