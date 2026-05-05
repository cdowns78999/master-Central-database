"""
LESSON 1: The smallest possible server.

Run this, then open your browser to:  http://localhost:4444

That's it. Your browser is the CLIENT, this script is the SERVER.
The browser sends a request, this script sends back "Hello Chad!"
"""

from http.server import HTTPServer, BaseHTTPRequestHandler

class MyHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        """This runs every time someone visits a URL on our server."""

        # Step 1: Send back a status code (200 = "everything's cool")
        self.send_response(200)

        # Step 2: Tell the browser what kind of data we're sending
        self.send_header('Content-Type', 'text/html')
        self.end_headers()

        # Step 3: Send the actual content
        self.wfile.write(b"""
            <h1 style="font-family: sans-serif; color: #1DB954;">
                Hello Chad!
            </h1>
            <p>This came from a Python server running on port 4444.</p>
            <p>Your browser asked, Python answered.</p>
        """)

# Start listening on port 4444
# '0.0.0.0' means "accept connections from anywhere on this machine"
server = HTTPServer(('0.0.0.0', 4444), MyHandler)
print('Server is listening on http://localhost:4444')
print('Press Ctrl+C to stop')
server.serve_forever()
