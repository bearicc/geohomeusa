# -*- coding: utf-8 -*-
"""
For python2.
"""
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as login_, logout as logout_
from django.contrib.auth.decorators import login_required
# from uuid import uuid4
# from urllib import parse
# from urllib.parse import parse_qs
import requests
import requests.auth
# from copy import deepcopy
# from lib import random_string
from django.conf import settings
import os
from wechat_sdk import WechatBasic
import hashlib

TOKEN = 'jrmevp1396842867'
DEBUG = True


def home(request):
    token = TOKEN
    if request.method == 'POST':
        signature = request.POST.get('signature', '')
        timestamp = request.POST.get('timestamp', '')
        nonce = request.POST.get('nonce')
    elif request.method == 'GET':
        signature = request.GET.get('signature', '')
        timestamp = request.GET.get('timestamp', '')
        nonce = request.GET.get('nonce')
        echostr = request.GET.get('echostr', '')

    if DEBUG:
        debug_log('==========')
        debug_log('token: '+str(token))
        debug_log('signature: '+str(signature))
        debug_log('timestamp: '+str(timestamp))
        debug_log('nonce: '+str(nonce))

    if token and timestamp and nonce and echostr:
        s = ''.join(sorted([token,timestamp,nonce]))
        debug_log('calculated sign: '+hashlib.sha1(s.encode('utf-8')).hexdigest())
        debug_log('echostr: '+str(echostr))
        wechat = WechatBasic(token=token)
        # 对签名进行校验
        if wechat.check_signature(signature, timestamp, nonce):
             return HttpResponse(echostr)
        else:
             return HttpResponse('')

    if signature:
        return weixin_response(token, signature, timestamp, nonce, request.body)
    return HttpResponse('<h1>微信开发中 ...</h1>')

    """
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
                    user = User.objects.create_user(username, '', password)
                else:
                    user = user[0]
                user.is_authenticated = True
                user.backend = 'django.contrib.auth.backends.ModelBackend'
                login_(request, user)

    return render(request, 'index.html', {'user': user, 'user_info': user_info})
    """


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


"""
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
"""


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


"""
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
"""


# weixin support
def validateURL(signature):
    return True
    import hashlib

    debug_log('token: '+WXTOKEN)
    s = ''.join(sorted([WXAPPID, WXAPPSECRET, WXTOKEN]))
    debug_log('s: '+s)
    if hashlib.sha1(s.encode('utf-8')).hexdigest() == signature:
        return True
    else:
        return False


def get_access_token():
    headers = {
            'grant_type': 'client_credential',
            'appid': WXAPPID,
            'secret': WXAPPSECRET}
    response = requests.get('https://api.weixin.qq.com/cgi-bin/token', headers)
    return response.json().get('access_token')


def debug_log(string, mode='a'):
    with open(os.path.join(settings.BASE_DIR, 'geohomeusa_debug'), mode) as f:
        f.write(string+'\n')


def weixin_response(token, signature, timestamp, nonce, body_text=''):
    debug_log('check sign ...\n')
    # 用户的请求内容 (Request 中的 Body)
    # 请更改 body_text 的内容来测试下面代码的执行情况

    # 实例化 wechat
    wechat = WechatBasic(token=token)
    # 对签名进行校验
    if wechat.check_signature(signature, timestamp, nonce):
        # 对 XML 数据进行解析 (必要, 否则不可执行 response_text, response_image 等操作)
        wechat.parse_data(body_text)
        # 获得解析结果, message 为 WechatMessage 对象 (wechat_sdk.messages中定义)
        message = wechat.get_message()

        response = None
        if message.type == 'text':
            if message.content == 'wechat':
                response = wechat.response_text(u'^_^')
            else:
                response = wechat.response_text(u'文字')
        elif message.type == 'image':
            response = wechat.response_text(u'图片')
        else:
            response = wechat.response_text(u'未知')

        # 现在直接将 response 变量内容直接作为 HTTP Response 响应微信服务器即可，此处为了演示返回内容，直接将响应进行输出
        return response
    return HttpResponse('')
