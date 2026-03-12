<div align="center">

<img src="https://img.shields.io/badge/Local%20Image%20Compressor-1a73e8?style=for-the-badge&logo=security&logoColor=white" alt="Local Image Compressor" height="50"/>

<br/>
<br/>

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-purple?style=flat-square)](https://github.com/gorupa/local-image-compressor)
[![Ad-Free](https://img.shields.io/badge/Ad--Free-✓-green?style=flat-square)](#)
[![No Server](https://img.shields.io/badge/No%20Server-100%25%20Local-blue?style=flat-square)](#)
[![Made with Canvas API](https://img.shields.io/badge/Canvas%20API-Powered-orange?style=flat-square)](#)

<br/>

# 🔒 Local Image Compressor

### Compress images instantly — right in your browser. No uploads. No tracking. No ads. Ever.

<br/>

[**🚀 Try it Live**](https://local-image-compressor.pages.dev) · [**📖 How it Works**](#how-it-works) · [**🛠 Run Locally**](#run-locally) · [**🤝 Contributing**](#contributing)

<br/>

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔒 **100% Private** | Your images never leave your device — no server, no upload |
| ⚡ **Live Size Preview** | See estimated file size *before* you compress, as you drag the slider |
| 🎚️ **Quality Control** | Fine-tune compression from 10% to 100% quality |
| 📁 **JPG & PNG Support** | Compress both major image formats |
| 🚫 **Zero Ads** | Completely ad-free, always |
| 🌐 **No Install Needed** | Runs entirely in any modern browser |
| 🧑‍💻 **Open Source** | MIT licensed — fork it, improve it, share it |

---

## 🖼️ How it Works

```
   You pick an image
         │
         ▼
   Canvas API loads it
   into browser memory
         │
         ▼
   You adjust quality (10–100%)
   ┌─────────────────────────┐
   │  Live preview estimates │
   │  output size in real    │
   │  time as you drag       │
   └─────────────────────────┘
         │
         ▼
   Click "Compress"
         │
         ▼
   Canvas re-encodes
   the image as JPEG
         │
         ▼
   Compressed file downloads
   directly to your device
```

> **No data is ever sent anywhere.** All processing happens locally using the browser's built-in [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

---

## 🚀 Run Locally

No build tools, no dependencies, no npm install. Just open the file.

```bash
# 1. Clone the repository
git clone https://github.com/gorupa/local-image-compressor.git

# 2. Enter the project folder
cd local-image-compressor

# 3. Open in your browser
open index.html
# — or double-click index.html in your file explorer
```

That's it. ✅

---

## 📁 Project Structure

```
local-image-compressor/
│
├── index.html          # Main HTML — app structure & layout
├── css/
│   └── style.css       # All styles, animations & theme variables
├── js/
│   └── script.js       # Compression logic, drag & drop, live preview
└── README.md           # You are here
```

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| **HTML5** | App structure & markup |
| **CSS3** | Animations, layout & design system |
| **Vanilla JavaScript** | Compression logic & UI interactions |
| **Canvas API** | Image decoding, re-encoding & quality control |
| **Google Material Icons** | UI icons |
| **DM Sans & DM Mono** | Typography |

> No frameworks. No bundlers. No dependencies. Pure web standards.

---

## 🔬 Under the Hood

The compression works by leveraging the browser's native `canvas.toBlob()` method:

```javascript
// 1. Load the image onto a canvas
const canvas = document.createElement('canvas');
canvas.getContext('2d').drawImage(img, 0, 0);

// 2. Re-encode at a lower quality setting (0.0 – 1.0)
canvas.toBlob((blob) => {
    // blob is your compressed image — never sent anywhere
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
}, 'image/jpeg', 0.8); // 0.8 = 80% quality
```

The **live size preview** runs this same compression in the background every time you move the slider, so you see the estimated file size *before* committing.

---

## 🔒 Privacy Policy

This tool has the simplest privacy policy possible:

- ❌ No data collection
- ❌ No analytics
- ❌ No cookies
- ❌ No server communication
- ❌ No ads
- ✅ Images stay 100% on your device

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how to get involved:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-idea`
3. **Commit** your changes: `git commit -m 'Add: your feature'`
4. **Push** to the branch: `git push origin feature/your-idea`
5. **Open** a Pull Request

### Ideas for contributions
- [ ] WebP output format support
- [ ] Batch compression (multiple files at once)
- [ ] Image preview before/after comparison slider
- [ ] Dark mode toggle
- [ ] Resize dimensions option

---

## 📄 License

```
MIT License

Copyright (c) 2026 gorupa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

See the full [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [gorupa](https://github.com/gorupa)

⭐ If this project helped you, consider giving it a star!

</div>
