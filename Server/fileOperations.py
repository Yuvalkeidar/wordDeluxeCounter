import json,simplejson
import uuid
import hashlib
import threading
import portalocker
import time

# files name
usersPath = 'users.json'
searchLog = 'searchLog.json'

# update user in user file
def updateUsers(data):
    global usersPath
    while True:
        try:
            fileData = open(usersPath, 'w')
            portalocker.Lock(fileData)
            jsondata = simplejson.dumps(data)
            fileData.write(jsondata)
            fileData.close()
            break
        except Exception as e:
            time.sleep(0.1)
    return 'Success',200

# update search log
def updateSearchLog(data,username):
    global searchLog
    # run the save to log in another thread to avoid user slowness
    updateLog = threading.Thread(target=updateSearchLogThread,args=(data,searchLog,username,))
    updateLog.start()
    
def recalculateLog(data,searchLog,username):
    with open(searchLog,'r') as json_file:  
        log = json.load(json_file)

    logForUpdate = log

    logData = {username:data}
    userExist = False
    for newWord in range(len(data)):
        for user in range(len(log)):
            try:
                # look for specific word for username in the serach log
                for existWord in range(len(log[user][username])):
                    userExist = True
                    if log[user][username][existWord]['word'].upper() == data[newWord]['word'].upper():
                        continue
            except:
                continue
            finally:
                # specific search word doenst exist for user exist
                if userExist == True:
                    logForUpdate[user][username].append(data[newWord])

        if userExist == False:
            logForUpdate.append(logData)
        userExist = False
        
    return logForUpdate

# recalculate the search word and add the new word
# to log in new thread searchLog.json file
def updateSearchLogThread(data,searchLog,username):

    log = recalculateLog(data,searchLog,username)

    while True:
        try:
            fileData = open(searchLog, 'w')
            portalocker.Lock(fileData)
            jsondata = simplejson.dumps(log)
            fileData.write(jsondata)
            fileData.close()
            break
        except IOError as e:
            # raise on unrelated IOErrors
            if e.errno != errno.EAGAIN:
                raise
            else:
                time.sleep(0.1)

# get users from user.json file
def getUsers():
    global usersPath
    with open(usersPath,'r') as json_file:  
        return json.load(json_file)

# changing password for saving in secure version
def hash_password(password):
    # generate a random number
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt

# check if plain password is equal to the secure version
def check_password(hashed_password, user_password):
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()
 