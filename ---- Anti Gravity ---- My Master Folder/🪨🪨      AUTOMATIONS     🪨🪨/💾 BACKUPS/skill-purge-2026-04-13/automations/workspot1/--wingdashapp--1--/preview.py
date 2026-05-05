import socket, subprocess, webbrowser, sys, os, time

PORT = 3001
FOLDER = os.path.dirname(os.path.abspath(__file__))

s = socket.socket()
already_up = s.connect_ex(('localhost', PORT)) == 0
s.close()

if not already_up:
    subprocess.Popen(
        [sys.executable, '-m', 'http.server', str(PORT)],
        cwd=FOLDER,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    time.sleep(0.4)

webbrowser.open(f'http://localhost:{PORT}/index.html?v={int(time.time())}')
sys.stdout.reconfigure(encoding='utf-8')
print(f"Preview live -> localhost:{PORT}")
