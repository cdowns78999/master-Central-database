# WordPress HTML Glossary — 25 Handles

Quick reference for building articles in the emulator.

| # | Tag | Purpose |
|---|-----|---------|
| 1 | `<p>text</p>` | Paragraph |
| 2 | `<br />` | Line break |
| 3 | `<strong>text</strong>` | Bold |
| 4 | `<em>text</em>` | Italic |
| 5 | `<u>text</u>` | Underline |
| 6 | `<s>text</s>` | Strikethrough |
| 7 | `<h2>text</h2>` | Heading 2 |
| 8 | `<h3>text</h3>` | Heading 3 |
| 9 | `<h4>text</h4>` | Heading 4 |
| 10 | `<a href="url">text</a>` | Link |
| 11 | `<a href="url" target="_blank" rel="noopener">text</a>` | External link |
| 12 | `<a href="url" rel="nofollow">text</a>` | Nofollow link |
| 13 | `<img src="url" alt="desc" class="aligncenter size-full" />` | Image |
| 14 | `<ul><li>item</li></ul>` | Unordered list |
| 15 | `<ol><li>item</li></ol>` | Ordered list |
| 16 | `<blockquote><p>text</p></blockquote>` | Blockquote |
| 17 | `<hr />` | Horizontal rule |
| 18 | `<code>text</code>` | Inline code |
| 19 | `<pre>text</pre>` | Code block |
| 20 | `[caption]<img /> text[/caption]` | Caption shortcode |
| 21 | `<!-- wp:paragraph --><p>text</p><!-- /wp:paragraph -->` | Gutenberg paragraph |
| 22 | `<!-- wp:heading {"level":2} --><h2>text</h2><!-- /wp:heading -->` | Gutenberg heading |
| 23 | `<!-- wp:image {"id":1} --><figure class="wp-block-image"><img /></figure><!-- /wp:image -->` | Gutenberg image |
| 24 | `<table><tr><th>H</th></tr><tr><td>C</td></tr></table>` | Table |
| 25 | `<!-- wp:separator --><hr class="wp-block-separator" /><!-- /wp:separator -->` | Gutenberg separator |

## WP Classes
- Alignment: `alignleft` `aligncenter` `alignright` `alignwide` `alignfull`
- Size: `size-thumbnail` `size-medium` `size-large` `size-full`
- Gutenberg wrapper: `<!-- wp:blockname -->` content `<!-- /wp:blockname -->`
