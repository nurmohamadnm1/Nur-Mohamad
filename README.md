# Nur Mohamad — Personal Website

🌐 **Live:** https://nurmohamadnm1.github.io/Nur-Mohamad/

Statistics, bioinformatics ও biostatistics নিয়ে আমার একাডেমিক ওয়েবসাইট। কোনো framework বা build step নেই — সাধারণ HTML/CSS/JS, তাই GitHub Pages-এ সরাসরি চলে।

## ফাইল কাঠামো

```
├── index.html            # পেজের কাঠামো (সাধারণত edit লাগবে না)
├── data.js               # ★ সব লেখা এখানে — শুধু এই ফাইলটা edit করো
├── 404.html              # ভুল লিংকের পেজ
├── .nojekyll             # GitHub Pages-কে বলে ফাইলগুলো যেমন আছে তেমন দেখাতে
└── assets/
    ├── css/style.css     # রং, ফন্ট, ডিজাইন
    ├── js/main.js        # সব ফিচার (data.js থেকে পেজ বানায়)
    ├── img/favicon.svg   # ব্রাউজার ট্যাবের আইকন
    └── Nur_Mohamad_CV.pdf  # ← তোমার CV-র PDF এখানে আপলোড করো
```

## GitHub Pages-এ প্রকাশ করা (৫ মিনিট)

1. GitHub-এ নতুন repository বানাও, নাম দাও **`তোমার-username.github.io`** (যেমন `nurmohamad.github.io`)। এতে সাইটের ঠিকানা হবে `https://তোমার-username.github.io`।
2. Repository-তে **Add file → Upload files** চাপো, zip খুলে **ভেতরের সব ফাইল ও ফোল্ডার** টেনে আনো (zip ফাইলটা নয়, ভেতরের জিনিস)। **Commit changes** চাপো।
3. **Settings → Pages** এ যাও। *Source*: **Deploy from a branch**, *Branch*: **main**, ফোল্ডার **/(root)** → **Save**।
4. ১–২ মিনিট পর সাইট লাইভ হবে।

> অন্য নামের repo (যেমন `portfolio`) হলে ঠিকানা হবে `https://username.github.io/portfolio/`।

## কীভাবে edit করবে

সবকিছু `data.js`-এ। GitHub-এ ফাইলটা খুলে ✏️ (pencil) চাপো, বদলাও, **Commit changes** — ১ মিনিটে সাইট আপডেট।

| কী করতে চাও | `data.js`-এ কোথায় |
|---|---|
| ছবি যোগ | `assets/img/`-এ ছবি আপলোড করে `photo: "assets/img/profile.jpg"` |
| CV ডাউনলোড বাটন | PDF-টা `assets/Nur_Mohamad_CV.pdf` নামে আপলোড (`cvFile: ""` দিলে বাটন লুকাবে) |
| Google Scholar, ORCID, LinkedIn, GitHub | `social:` অংশে লিংক বসাও — খালি থাকলে দেখাবে না |
| নতুন publication | `publications:`-এ একটা `{ ... },` ব্লক কপি করে বদলাও; DOI পেলে `doi: "10.xxxx/..."` |
| পাবলিকেশন under review → published | `status: "published"` করে দাও, ফিল্টার নিজে থেকেই ঠিক হবে |
| নতুন খবর | `news:`-এর **শুরুতে** নতুন লাইন যোগ করো |
| সেকশনের ক্রম বদলানো / লুকানো | `sections:` লিস্টে নাম আগে-পিছে করো বা মুছে দাও |
| ফোন নম্বর লুকানো | `showPhone: false` |
| রেফারেন্স লুকানো | `showReferences: false` ("Available on request" দেখাবে) |
| Hero-র টাইপিং লেখা | `roles:` |

**সতর্কতা:** লেখা সবসময় `"..."` এর ভেতরে রাখো, প্রতিটা আইটেমের শেষে কমা `,` দিতে ভুলো না। কিছু ভেঙে গেলে আগের commit-এ ফিরে যেতে পারবে (History)।

## ফিচারসমূহ

- Light / dark mode (সিস্টেম অনুযায়ী + টগল, পছন্দ মনে রাখে)
- Hero-তে animated wheat **Manhattan plot** (GWAS; ৭টা chromosome group, 5×10⁻⁸ threshold) — "resample" চাপলে নতুন প্লট
- টাইপিং অ্যানিমেশন, R-console স্টাইলে `summary()` quick facts
- Publications: ফিল্টার (Journal / Conference / Published / Under review), সার্চ, নিজের নাম হাইলাইট, **Copy APA** ও **Copy BibTeX**
- Experience টাইমলাইন, skills, projects, leadership, news (Show all), references
- Contact form + email/phone কপি বাটন
- Sticky menu + scroll spy, মোবাইল মেনু, reading progress bar, back-to-top
- SEO: meta tags, Open Graph, schema.org Person (Google-এ ভালো দেখায়)
- Print করলে পরিষ্কার CV-র মতো আসে; 404 পেজ; accessibility ও reduced-motion সাপোর্ট

## Contact form সত্যি সত্যি চালু করা (ফ্রি)

ডিফল্টভাবে form ভিজিটরের email app খোলে। সরাসরি তোমার inbox-এ মেসেজ পেতে:

1. [formspree.io](https://formspree.io)-তে `nurmohamadnm1@gmail.com` দিয়ে ফ্রি অ্যাকাউন্ট খোলো
2. New Form বানাও, endpoint কপি করো (যেমন `https://formspree.io/f/abcdwxyz`)
3. `data.js`-এ `formspreeEndpoint: "https://formspree.io/f/abcdwxyz"`

## ঐচ্ছিক

- **Google Analytics:** `googleAnalyticsId: "G-XXXXXXXXXX"`
- **নিজস্ব ডোমেইন:** Settings → Pages → Custom domain
- **রং বদলানো:** `assets/css/style.css`-এর শুরুতে `--accent` ও `--hit`
- **নিজের কম্পিউটারে দেখা:** `index.html` ডাবল-ক্লিক করলেই খুলবে
