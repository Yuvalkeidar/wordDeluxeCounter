import re
import sys
# import the flask_cors from package add that path
sys.path.insert(0, './packages/')

import requests
import justext
import json,jsonify
from flask import Flask, redirect, url_for, request, jsonify,render_template
from fileOperations import hash_password,check_password,updateUsers,getUsers,updateSearchLog
from flask_cors import CORS

app = Flask(__name__)

# open the webservie to all origins
CORS(app)

# register
@app.route('/register',methods = ['POST'])
def register():
    username = request.args['username'].upper()
    users = getUsers()
    for i in range(len(users)):
        if users[i]['username'].upper() == username:
            return 'There is identical username',403  
    user = ({
        'username':username,
        'password':hash_password(request.data) })
    users.append(user)
    return updateUsers(users)

# login
@app.route('/login',methods = ['POST'])
def login():
    try:
        username = request.args['username'].upper()
        users = getUsers()
        for i in range(len(users)):
            if users[i]['username'].upper() == username and \
               check_password(users[i]['password'],request.data) == True:
                    return 'Logon Success',200
        return 'There is problem with user and password',403  
    except:
        return 'Problem occuered',403 

# get number of words in url
@app.route('/countWords',methods = ['POST'])
def countWords():
    if  request.args['url'] \
    and request.args['username'] \
    and len(request.data) > 0:
        words = json.loads(request.data)
        return countWordFromUrl(words,request.args['url'],request.args['username'])

# count word from url and keep them with new thread in file
def countWordFromUrl(words,url,username):
    try:
        response = requests.get(url,allow_redirects=True)
        paragraphs = justext.justext(response.content, justext.get_stoplist("English"))
        for paragraph in paragraphs:
            for i in range(len(words)):
                words[i]['count'] += len(re.findall('(?i)'+words[i]['word'],paragraph.text))
        updateSearchLog(words,username)
        return jsonify({'words': words})
    except Exception as e:
        return e.message,403