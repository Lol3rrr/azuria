#!/usr/bin/python
import mcquery
import time

print 'Ctrl-C to exit'

host = raw_input('Host (localhost): ')
port = raw_input('Port (25565): ')

if host == '':
    host = '128.0.121.73'
if port == '':
    port = 25566
else:
    port = int(port)



print "Connecting..."
q = mcquery.MCQuery(host, port)
print "Connected."

stats = q.full_stat()

print stats
