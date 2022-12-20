import json 

class Controller:
    ''' this class parse the request parameters and passes 
    them to the according db function'''
    def __init__(self, request_txt):

        # setting request's method (Get, Post, delete...)
        self.method = request_txt[:request_txt.find("/")]

        # locating the paramaters string in the http request 
        start_params = request_txt.find("/") + 1
        end_params = request_txt.find(" ", start_params + 1)
        raw_params = request_txt[start_params: end_params].split("&")

        # adding key-value params to a dictionary 
        self.params = {}
        for param in raw_params:
            key = param.split("=")[0]
            val = param.split("=")[1]
            self.params[key] = val
        
        print(self.params)

    def sign_in(self):
        with open('users.json') as file: 
            users = json.load(file)
            print(users)
