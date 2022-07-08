import requests
from flask import Flask, request, render_template
# requsets, flask are installed by using code 'pip install requrests flask'

app = Flask(__name__)

@app.route('/upload', methods=['GET'])
def uploadFile():
  try:
    # url = 'https://image-processed.cyclic.app/upload'
    url = 'http://localhost:8080/upload'
    # file = open('/Users/seungwookim/ML/images/apartment_num_test1.jpg', 'rb')
    file = open('/Users/seungwookim/ML/images/apartment_num_test1.jpg', 'rb')
    # file = open('Image path', 'rb')
    uploadFile = {'uploadFile': file}
    print(uploadFile)
    r = requests.post(url, files=uploadFile)
    print(r.text)
    resContent = int(r.json()['detectionValue'])
    # key value detection
    print(resContent)
  except:
    print('Something went wrong!')
  return 'Delivery Address : '+str(resContent)

# received by post method!
@app.route('/method', methods=['POST'])
def method():
  num = request.form["num"]
  # Delivery Address
  # 해당 num을 가지고 navi에 보내면 됨!

  return "POST로 전달된 배송 호 수 데이터({})".format(num)


if __name__ == '__main__':
  app.run(host='localhost', port=3000, debug=True)