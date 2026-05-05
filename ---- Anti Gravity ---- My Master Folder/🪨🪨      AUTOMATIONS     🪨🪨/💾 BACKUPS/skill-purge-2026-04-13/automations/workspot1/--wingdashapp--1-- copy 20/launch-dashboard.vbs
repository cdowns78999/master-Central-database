' ============================================================
'  Wing Dashboard — Silent Launcher (no CMD window flash)
'  Double-click this or pin it to taskbar.
'  Runs launch-dashboard.bat completely hidden.
' ============================================================

Set fso = CreateObject("Scripting.FileSystemObject")
Set WshShell = CreateObject("WScript.Shell")

' Resolve bat path relative to this script's own folder
batPath = fso.GetParentFolderName(WScript.ScriptFullName) & "\launch-dashboard.bat"

' Run hidden (0 = vbHide), don't wait for it to finish (False)
WshShell.Run Chr(34) & batPath & Chr(34), 0, False
