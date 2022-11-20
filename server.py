import socket 

# used for routing the requests 
from router import *

# used for http request validations 
from validation import * 

# open for clients outside the LAN
IP='0.0.0.0'

# Listening port
PORT=80

# TTL for socket which doesn't repond
SOCKET_TIMEOUT = 0.1

# create a global request router 
router = Router()

# create a global request validator 
validation = Validation()



def main():
    # Open a socket and loop forever while waiting for clients
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server_socket.bind((IP, PORT))

    # address listener will be closed when program is interrupted 
    server_socket.listen()
    print(f"Listening for connections on port [{PORT}]...")

    while True:
        client_socket, client_address = server_socket.accept()
        print(f'New connection received from [{client_address}]')
        client_socket.settimeout(SOCKET_TIMEOUT)


        request = client_socket.recv(1024)
        print(request)
    
        res = f"HTTP/1.0 200 OK\n\n<h1>Hello {client_address[0]}!<h1>"
        client_socket.sendall(res.encode())
        client_socket.close()
        print("sent")


if __name__ == "__main__":
    # Call the main handler function
    main()