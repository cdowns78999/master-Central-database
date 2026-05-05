import http.server
import socketserver

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def send_response_only(self, code, message=None):
        super().send_response_only(code, message)
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')

PORT = 8904
with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
    print(f"No-cache server on http://localhost:{PORT}")
    httpd.serve_forever()
