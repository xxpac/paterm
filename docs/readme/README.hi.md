<div align="center">
  <img src="../../public/logo.png" width="144" height="144" alt="Paterm" />
  <h1>Paterm</h1>
  <p><strong>हल्का, टर्मिनल-केंद्रित डेवलपमेंट वर्कस्पेस।</strong></p>
  <p><a href="https://paterm.app">वेबसाइट</a> · <a href="https://paterm.app/docs">दस्तावेज़</a> · <a href="https://github.com/crynta/Paterm-website">वेबसाइट का सोर्स कोड</a></p>

  <p>
    <img src="https://img.shields.io/github/v/release/xxpac/paterm?label=version&color=blue" alt="संस्करण" />
    <img src="https://img.shields.io/github/downloads/xxpac/paterm/total?label=downloads&color=blue" alt="डाउनलोड" />
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-lightgrey" alt="प्लेटफ़ॉर्म" />
    <a href="https://discord.gg/tyveTUyEp7"><img src="https://img.shields.io/badge/Discord-5865F2?logo=discord&logoColor=white" alt="Discord" /></a>
    <a href="https://www.youtube.com/@crynta"><img src="https://img.shields.io/badge/Youtube-FF0000?logo=youtube&logoColor=white" alt="YouTube" /></a>
  </p>
</div>

<p align="center">
  <a href="../../README.md">English</a> | <a href="README.zh-CN.md">简体中文</a> | <a href="README.es.md">Español</a> | <a href="README.de.md">Deutsch</a> | <a href="README.fr.md">Français</a> | <a href="README.ja.md">日本語</a> | <a href="README.ko.md">한국어</a> | <a href="README.pt-BR.md">Português</a> | <a href="README.pl.md">Polski</a> | <a href="README.ru.md">Русский</a> | <a href="README.id.md">Bahasa Indonesia</a>
</p>

---

Paterm एक हल्का, ओपन-सोर्स, टर्मिनल-केंद्रित डेवलपमेंट एनवायरनमेंट है, जिसे Tauri 2 + Rust और React 19 पर बनाया गया है। इसमें WebGL रेंडरर वाला नेटिव PTY बैकएंड, कोड एडिटर, फ़ाइल एक्सप्लोरर और वेब प्रीव्यू पैनल शामिल हैं। डिस्क पर लगभग 7-8 MB। कोई टेलीमेट्री नहीं। कोई खाता नहीं।

## स्क्रीनशॉट

<table>
  <tr><td colspan="2" align="center"><img src="../terminal.png" alt="टर्मिनल" style="border-radius: 4px;" /><br/><sub>एडिटर जैसे इनपुट पैनल वाला ब्लॉक-आधारित WebGL टर्मिनल</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../web-preview.png" alt="वेब प्रीव्यू" style="margin-top: 12px;"/><br/><sub>स्थानीय डेवलपमेंट सर्वर का वेब प्रीव्यू</sub></td></tr>
  <tr><td colspan="2" align="center"><img src="../themes.png" alt="थीम और बैकग्राउंड" style="margin-top: 12px;"/><br/><sub>कस्टम थीम, प्रीसेट और बैकग्राउंड इमेज</sub></td></tr>
</table>

## सुविधाएँ

### टर्मिनल

- WebGL रेंडरर, मल्टी-टैब और बैकग्राउंड स्ट्रीमिंग के साथ xterm.js
- एडिटर जैसे कमांड इनपुट वाला GPU-त्वरित ब्लॉक-आधारित टर्मिनल
- `portable-pty` के माध्यम से नेटिव PTY बैकएंड (zsh, bash, pwsh, fish, cmd)
- क्षैतिज और लंबवत स्प्लिट पैनल
- इनलाइन खोज, लिंक पहचान और ट्रू कलर
- एक्सप्लोरर या डेस्कटॉप से फ़ाइलों को शेल-सुरक्षित उद्धृत पाथ के रूप में टर्मिनल में खींचें
- Windows पर प्रति-टैब वर्कस्पेस एनवायरनमेंट (Local या कोई स्थापित WSL डिस्ट्रो)
- Spaces अगली बार शुरू होने पर टैब, कार्य निर्देशिका और स्प्लिट लेआउट पुनर्स्थापित करता है

### कोड एडिटर

- CodeMirror 6, जो TS/JS, Rust, Python, Go, C/C++, Java, HTML/CSS, JSON और Markdown जैसी लोकप्रिय भाषाओं का समर्थन करता है
- डायग्नोस्टिक्स, नेविगेशन, कम्प्लीशन, फ़ॉर्मेटिंग और कस्टम सर्वर के साथ वैकल्पिक लैंग्वेज सर्वर समर्थन
- रेंडर्ड Markdown और इमेज, वीडियो, ऑडियो तथा PDF देखना
- Vim मोड
- Kanagawa, Catppuccin, Rosé Pine, Everforest, Dracula, Solarized, Nord, Tokyo Night, GitHub और Xcode सहित बिल्ट-इन थीम

### फ़ाइल एक्सप्लोरर

- Catppuccin आइकन थीम
- फ़ज़ी खोज, कीबोर्ड नेविगेशन, इनलाइन नाम बदलना और संदर्भ क्रियाएँ
- डिस्क पर फ़ाइल बदलने पर लाइव अपडेट

### वेब प्रीव्यू

- स्थानीय डेवलपमेंट सर्वर अपने आप पहचानकर प्रीव्यू टैब में खोलता है
- नेटिव चाइल्ड WebView के माध्यम से बाहरी URL का प्रीव्यू

### थीम और कस्टमाइज़ेशन

- ऐप में कस्टम थीम बनाएँ और बिल्ट-इन प्रीसेट तथा अपनी थीम के बीच बदलें
- थीम साझा करें या समुदाय से आयात करें
- समायोज्य अपारदर्शिता और ब्लर वाली बैकग्राउंड इमेज
- एडिटर थीम ऐप थीम से स्वतंत्र है

## इंस्टॉल करें

नवीनतम इंस्टॉलर [Releases](https://github.com/xxpac/paterm/releases/latest) पेज पर हैं। Paterm वहीं से अपने आप अपडेट होता है।

### Windows नोट्स

- डिफ़ॉल्ट शेल पहचान: `pwsh.exe` (PowerShell 7+) -> `powershell.exe` (Windows PowerShell 5.1) -> `cmd.exe`।
- WSL एक पूर्ण वर्कस्पेस एनवायरनमेंट है, केवल लिपटा हुआ सबप्रोसेस नहीं।

### Linux नोट्स

- **Arch / AUR:** `yay -S paterm-bin` या `paru`। यह नवीनतम रिलीज़ का अनुसरण करता है।
- **NixOS / Nix:** आधिकारिक flake का उपयोग करें। NixOS के बाहर `nix profile install github:xxpac/paterm` चलाएँ। NixOS में flake आयात करें और `inputs.paterm.packages.${pkgs.system}.paterm` को `environment.systemPackages` में जोड़ें। आसान सेटअप के लिए `nixosModules.paterm` भी उपलब्ध है।
- **AppImage:** FUSE आवश्यक है। इसके बिना `./Paterm_*.AppImage --appimage-extract-and-run` चलाएँ। Wayland पर रेंडरिंग समस्या हो तो `WEBKIT_DISABLE_DMABUF_RENDERER=1` आज़माएँ। `.deb` / `.rpm` पैकेज सिस्टम GTK स्टैक से जुड़ते हैं और आम तौर पर अधिक सुचारु चलते हैं।

## सोर्स से बिल्ड करें

**आवश्यकताएँ**

- Rust (stable), https://rustup.rs
- Node 20+ और [pnpm](https://pnpm.io)
- आपके प्लेटफ़ॉर्म के लिए Tauri आवश्यकताएँ, https://tauri.app/start/prerequisites/

**चलाएँ**

```bash
pnpm install
pnpm tauri dev          # डेवलपमेंट
pnpm tauri build        # प्रोडक्शन बंडल
```

**जाँच**

```bash
pnpm lint
pnpm check-types
pnpm test
cd src-tauri && cargo clippy --all-targets --locked -- -D warnings   # CI के समान Rust lint
cd src-tauri && cargo nextest run --locked                           # या cargo test --locked
```

## टेक स्टैक

Tauri 2, Rust, `portable-pty`, React 19, TypeScript, Vite, xterm.js, CodeMirror 6, Tailwind v4, shadcn/ui और Zustand।

## योगदान

Issues और PR का स्वागत है। समस्याएँ रिपोर्ट करें, सुविधाएँ सुझाएँ या pull request भेजें। अधिक जानकारी के लिए [CONTRIBUTING.md](../../CONTRIBUTING.md) और [आर्किटेक्चर दस्तावेज़](../README.md) देखें।

## लाइसेंस

Paterm Apache-2.0 लाइसेंस के अंतर्गत है। निर्भरताओं की जानकारी के लिए [Apache License 2.0](../../LICENSE) देखें।
