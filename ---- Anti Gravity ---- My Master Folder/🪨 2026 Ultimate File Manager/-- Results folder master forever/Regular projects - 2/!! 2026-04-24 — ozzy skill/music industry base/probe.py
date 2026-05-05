import os
p1 = "templates/category-page.template.html"
abs1 = os.path.abspath(p1)
print("cwd:", os.getcwd())
print("len(cwd):", len(os.getcwd()))
print("p1 exists:", os.path.exists(p1))
print("abs1:", abs1)
print("len(abs1):", len(abs1))
print("abs1 exists:", os.path.exists(abs1))
ext = "\\\\?\\" + abs1
print("ext:", ext)
print("ext exists:", os.path.exists(ext))
import unicodedata
print("nfkc(p1) exists:", os.path.exists(unicodedata.normalize("NFC", p1)))
# Try listing the templates dir
try:
    print("listdir(templates):", os.listdir("templates"))
except Exception as e:
    print("listdir err:", e)
