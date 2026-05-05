# Port & Server Lessons

Run these in order. Each one builds on the last.

## Lesson 1: Simplest Server
```
python 1-tiny-server.py
```
Then visit http://localhost:4444 in your browser.

## Lesson 2: Routes
```
python 2-routes-server.py
```
Visit http://localhost:4444 and click the links — each URL triggers different code.

## Lesson 3: POST (sending data)
```
python 3-post-server.py
```
Then open `3-test-page.html` in your browser. Type messages — they go from browser → server → back.

This is exactly how your Wing Dashboard talks to save-result-server.py.

---

**Only one server can use a port at a time.** Stop each lesson (Ctrl+C) before starting the next.
