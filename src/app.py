#!/usr/bin/python
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from os import curdir, sep

import mcquery

PORT_NUMBER = 80

#This class will handles any incoming request from
#the browser
class myHandler(BaseHTTPRequestHandler):

	#Handler for the GET requests
    def do_GET(self):
        if self.path == "/":
            self.path = "/index"

        try:
            #Check the file extension required and
            #set the right mime type

            sendReply = False
            api = False

            if self.path.endswith(".png"):
				mimetype='image/png'
				sendReply = True
            if self.path.endswith(".gif"):
				mimetype='image/gif'
				sendReply = True
            if self.path.endswith(".js"):
				mimetype='application/javascript'
				sendReply = True
            if self.path.endswith(".css"):
				mimetype='text/css'
				sendReply = True

            if "api" in self.path:
                sendReply = False
                api = True

            if sendReply == False and api == False and self.path.endswith(".ico") == False:
                mimetype='text/html'
                self.path = "/html" + self.path + ".html"
                sendReply = True

            if sendReply == True:
				#Open the static file requested and send it
				f = open(curdir + sep + self.path)
				self.send_response(200)
				self.send_header('Content-type',mimetype)
				self.end_headers()
				self.wfile.write(f.read())
				f.close()
            if api == True:
                if "fullStat" in self.path:
                    host = "128.0.121.73"
                    port = 25566
                    q = mcquery.MCQuery(host, port)

                    stats = q.full_stat()
                    self.send_response(200)
                    self.send_header('Content-type', "text/plain")
                    self.end_headers()
                    self.wfile.write(stats)
            return

        except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)

try:
	#Create a web server and define the handler to manage the
	#incoming request
	server = HTTPServer(('', PORT_NUMBER), myHandler)
	print 'Started httpserver on port ' , PORT_NUMBER

	#Wait forever for incoming htto requests
	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	server.socket.close()
