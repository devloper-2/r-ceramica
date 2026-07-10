# icons

Place all icon and favicon variants here:

```
public/icons/
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png     (180×180 px)
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── site.webmanifest
```

## site.webmanifest example

```json
{
  "name": "R Ceramica",
  "short_name": "R Ceramica",
  "icons": [
    { "src": "/icons/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0a0a0a",
  "background_color": "#0a0a0a",
  "display": "standalone"
}
```
