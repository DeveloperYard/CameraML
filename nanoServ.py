import requests
from flask import Flask, request, render_template
# requsets, flask are installed by using code 'pip install requrests flask'

global file

app = Flask(__name__)
@app.route('/', methods=['GET'])
def homePage():
  return 'hello main page!'


@app.route('/upload', methods=['GET'])
# 해당 파이썬 서버의 주소로 GET 요청을 보내면 아래 url로 POST 요청을 보낸다고 인식하면 됨
def uploadFile():
  try:
    url = 'http://13.209.153.109:3000/upload'
    # url = 'http://localhost:8080/upload'
    # file = open('/Users/seungwookim/ML/images/apartment_num_test1.jpg', 'rb')
    file = open('/Users/seungwookim/ML/images/apartment_num_test3.jpg', 'rb')
    # file = open('Image path', 'rb')
    uploadFile = {
      'uploadFile': file,
      }
    print(uploadFile)
    r = requests.post(url, files=uploadFile)
    print(r.text)
    resContent = r.json()['detectionValue']
    # key value detection
    print(resContent)
  except:
    print('Something went wrong!')
  return 'Delivery Address : '+resContent

# received by post method!
@app.route('/method', methods=['POST'])
def method():
  num = request.form["num"]
  # Delivery Address
  # 해당 num을 가지고 navi에 보내면 됨!
  print(num)
  return "POST로 전달된 배송 호 수 데이터({})".format(num)


if __name__ == '__main__':
  app.run(host='localhost', port=3000, debug=True)