import requests

file = open('/Users/seungwookim/ML/images/apartment_num_test2.jpg', 'rb')
# open 후 들어가는 경로에 지정하면 됨
    # file = open('Image path', 'rb')
uploadFile = {
    'uploadFile': file,
}

url = 'http://13.209.153.109:3000/upload'

r = requests.post(url, files=uploadFile)

print(r.json()['detectionValue'])

# exec(open("./nanoServ.py").read())