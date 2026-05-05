"""
LESSON 2: Routes — different URLs do different things.

This is how your Wing Dashboard server works.
When JS calls fetch('/save'), the server sees the PATH is "/save"
and runs the save logic. Different path = different behavior.

Run this, then visit:
  http://localhost:4444/           → homepage
  http://localhost:4444/time       → current time
  http://localhost:4444/about      → about page
  http://localhost:4444/anything   → 404 not found
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime

class MyHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        # self.path is the URL the client asked for
        # Visit /time  → self.path == '/time'
        # Visit /about → self.path == '/about'

        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(b"""
                <h1>Home Page</h1>
                <p>Try visiting:</p>
                <ul>
                    <li><a href="/time">/time</a></li>
                    <li><a href="/about">/about</a></li>
                    <li><a href="/bogus">/bogus (will 404)</a></li>
                </ul>
            """)

        elif self.path == '/time':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            now = datetime.now().strftime('%I:%M:%S %p')
            self.wfile.write(f'<h1>Current time: {now}</h1>'.encode())

        elif self.path == '/about':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<h1>About</h1><p>This is a learning server.</p>')

        else:
            # 404 = "I don't know what you're asking for"
            self.send_response(404)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(f'<h1>404 - Not Found</h1><p>No route for: {self.path}</p>'.encode())

    def log_message(self, format, *args):
        # Print a clean log so you can SEE each request come in
        print(f'  → Someone visited: {args[0]}')

server = HTTPServer(('0.0.0.0', 4444), MyHandler)
print('Server running on http://localhost:4444')
print('Press Ctrl+C to stop')
server.serve_forever()
