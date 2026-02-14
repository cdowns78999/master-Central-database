$c = Get-Content 'C:\Users\chad\OneDrive\Documents\---- Anti Gravity ---- My Master Folder\temp_embed.html' -Raw
$r = [regex]'https://[a-zA-Z0-9\-\.]+/image/[a-f0-9]+'
$ms = $r.Matches($c)
foreach($x in $ms) { Write-Host $x.Value }
Write-Host "---"
# Also search for coverArt or image fields in JSON
$r2 = [regex]'"coverArt":\{[^}]+\}'
$ms2 = $r2.Matches($c)
foreach($x in $ms2) { Write-Host $x.Value }
Write-Host "---"
# Search for any URL containing image
$r3 = [regex]'https://[a-zA-Z0-9\-\.]+\.com/image/ab67[a-f0-9]+'
$ms3 = $r3.Matches($c)
foreach($x in $ms3) { Write-Host $x.Value }
