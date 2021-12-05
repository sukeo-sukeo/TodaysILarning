## vue2とvue3の違いかどうかは分かりませんが変更となっていた
errorは出ませんしcssも適用されますが、warningとして指摘されます。
vue2
```css
.content >>> h1
```
vue3
```css
.content:deep(h1)
```