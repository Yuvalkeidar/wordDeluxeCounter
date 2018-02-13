import json,jsonify,simplejson

searchLog = 'searchLog.json'
with open(searchLog,'r') as json_file:  
    log = json.load(json_file)

# pass over users
for user in range(len(log)):
    for username, words in log[user].iteritems() :
        print '\nUser: {} - looks for those words: \n'.format(username)
        # pass over word and number of apperances
        for index in range(len(words)):
            print 'Word: {} Number of Apperance: {}'.format(words[index]['word'],words[index]['count'])
