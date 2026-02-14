$c = Get-Content 'C:\Users\chad\OneDrive\Documents\---- Anti Gravity ---- My Master Folder\temp_embed.html' -Raw
# Extract __NEXT_DATA__ JSON
$r = [regex]'<script id="__NEXT_DATA__" type="application/json">(.+?)</script>'
$m = $r.Match($c)
if ($m.Success) {
    $json = $m.Groups[1].Value
    $obj = $json | ConvertFrom-Json
    # Output relevant part
    $obj.props.pageProps | ConvertTo-Json -Depth 10 | Out-String -Width 4096
}
