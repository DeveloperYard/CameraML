import requests

url = 'http://localhost:3000/delivery/dest'

r = requests.get(url)

if r.json() == {}:
    print('not exist delivery target place')
else:
    print(r.json()['targetPlace'])
