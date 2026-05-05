import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

base = 'C:/Users/chad/OneDrive/Documents/GitHub/master-Central-database/---- Anti Gravity ---- My Master Folder/\U0001faa8\U0001faa8\U0001faa8\U0001faa8 Ran Plan Area/music-industry-knowledge-app/research'

all_sources = {}

for i in range(1, 7):
    fpath = f'{base}/sources-batch-{i}.md'
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Use unicode em-dash U+2014
    pattern = (
        r'### CAT-(\d+)-TILE-(\d+)\s*\|[^\n]*\|\s*(FACT|PRACTICE|MISTAKE)\s*\n'
        r'\*\*Claim:\*\*[^\n]*\n'
        r'\*\*Source 1:\*\*\s*\[([^\]]+)\]\(([^)]+)\)\s*\u2014\s*([^\n]+?)\s*\n'
        r'\*\*Source 2:\*\*\s*\[([^\]]+)\]\(([^)]+)\)\s*\u2014\s*([^\n]+?)\s*$'
    )

    for m in re.finditer(pattern, content, re.MULTILINE):
        cat_id = int(m.group(1))
        tile_num = int(m.group(2))
        tile_type = m.group(3).lower()
        s1_title = m.group(4).strip()
        s1_url = m.group(5).strip()
        s1_type = m.group(6).strip()
        s2_title = m.group(7).strip()
        s2_url = m.group(8).strip()
        s2_type = m.group(9).strip()

        if cat_id not in all_sources:
            all_sources[cat_id] = {}
        all_sources[cat_id][tile_num] = {
            'tileType': tile_type,
            'sources': [
                {'title': s1_title, 'url': s1_url, 'type': s1_type},
                {'title': s2_title, 'url': s2_url, 'type': s2_type}
            ]
        }

def escape_js(s):
    s = s.replace('\\', '\\\\')
    s = s.replace('"', '\\"')
    s = s.replace("'", "\\'")
    return s

# Build dict: cat_id -> JS string for tileSources array
output = {}
for cat_id in sorted(all_sources.keys()):
    tiles = all_sources[cat_id]
    entries = []
    for tile_num in sorted(tiles.keys()):
        t = tiles[tile_num]
        srcs = []
        for s in t['sources']:
            title_esc = escape_js(s['title'])
            url_esc = escape_js(s['url'])
            type_esc = escape_js(s['type'])
            srcs.append('{title: "' + title_esc + '", url: "' + url_esc + '", type: "' + type_esc + '"}')
        sources_str = ', '.join(srcs)
        entries.append('        { tileType: "' + t['tileType'] + '", index: ' + str(tile_num - 1) + ', sources: [' + sources_str + '] }')

    js_block = ',\n'.join(entries)
    output[cat_id] = '      tileSources: [\n' + js_block + '\n      ]'

# Write output to a temp file as JSON
with open('C:/Users/chad/tile_sources_output.json', 'w', encoding='utf-8') as f:
    json.dump({str(k): v for k, v in output.items()}, f, ensure_ascii=False)

# Print summary
print(f'Generated tileSources for {len(output)} categories')
for cat_id in sorted(output.keys()):
    tiles = all_sources[cat_id]
    print(f'  Cat {cat_id}: {len(tiles)} tiles')
