# TipidCard – Complete APK & Play Store Guide

## What You Have Now

Your app is now a **Progressive Web App (PWA)** — the standard way to convert a web app into a real Android APK without writing native Android code. Google officially supports this via **Trusted Web Activity (TWA)**.

---

## Your File Checklist

Make sure you have all these files in the **same folder**:

```
tipidcard/
├── index.html        ✅ Your main app
├── manifest.json     ✅ PWA identity file
├── sw.js             ✅ Service worker (offline support)
└── icons/
    ├── icon-72.png   ✅
    ├── icon-96.png   ✅
    ├── icon-128.png  ✅
    ├── icon-144.png  ✅
    ├── icon-152.png  ✅
    ├── icon-192.png  ✅
    ├── icon-384.png  ✅
    └── icon-512.png  ✅
```

---

## STEP 1 — Host Your App Online (Free, ~5 minutes)

Your app needs a **public https:// URL**. The easiest option is Netlify.

### Option A: Netlify (Recommended — Easiest)

1. Go to **https://netlify.com** and create a free account
2. Click **"Add new site" → "Deploy manually"**
3. Drag and drop your entire `tipidcard/` folder onto the page
4. Netlify gives you a URL like: `https://tipidcard-abc123.netlify.app`
5. ✅ You're hosted!

> **Optional:** Go to Site Settings → Domain → rename it to `tipidcard.netlify.app`

### Option B: GitHub Pages (If you use GitHub)

1. Create a new GitHub repository named `tipidcard`
2. Upload all your files to it
3. Go to Settings → Pages → Source: main branch → / (root)
4. Your URL: `https://yourusername.github.io/tipidcard`

---

## STEP 2 — Test Your PWA (Important!)

Before generating the APK, verify your PWA is valid:

1. Open your Netlify URL in **Chrome on desktop**
2. Press **F12** → Go to **Lighthouse** tab
3. Click **"Analyze page load"** → check the **PWA** score
4. You need a **green PWA badge** ✅ to proceed

Also test on your Android phone:
- Open the URL in Chrome
- You should see **"Add to Home screen"** prompt
- Install it — it should open like a real app (no browser bar)

---

## STEP 3 — Generate the APK with PWABuilder (~10 minutes)

**PWABuilder** is Microsoft's free tool — officially recommended by Google.

1. Go to **https://pwabuilder.com**
2. Paste your Netlify URL → Click **"Start"**
3. Wait for it to analyze your PWA (should get a high score)
4. Click **"Package for stores"**
5. Click **"Android"** → Click **"Generate Package"**
6. Fill in these details:
   - **Package ID:** `com.tipidcard.app` *(must be unique — reverse domain style)*
   - **App Name:** `TipidCard`
   - **Short Name:** `TipidCard`
   - **Version:** `1.0.0`
   - **Version Code:** `1`
   - **Signing Key:** Select **"New" (let PWABuilder generate one)**
   - **Key Alias:** `tipidcard`
   - **Key Password:** *(choose a strong password — SAVE THIS, you need it forever)*
7. Click **"Generate"** — it downloads a `.zip` file

### Inside the ZIP you'll find:
```
tipidcard-android.zip/
├── tipidcard.apk         ← Install directly on Android (sideload)
├── tipidcard.aab         ← Upload to Play Store (required)
├── signing-key.jks       ← YOUR KEYSTORE — NEVER LOSE THIS FILE
└── README.txt
```

> ⚠️ **CRITICAL:** The `signing-key.jks` file is your app's identity forever.
> If you lose it, you can NEVER update your app on the Play Store.
> Back it up to Google Drive, email it to yourself, store it safely.

---

## STEP 4 — Test the APK on Your Phone

Before uploading to Play Store, test the APK:

1. Email the `tipidcard.apk` to yourself or copy to phone via USB
2. On your Android phone: Settings → Security → **Enable "Install unknown apps"**
3. Open the APK file and install it
4. Open TipidCard from your home screen
5. Test everything: add items, scan, history, dark mode

---

## STEP 5 — Create a Google Play Developer Account

1. Go to **https://play.google.com/console**
2. Sign in with your Google account
3. Pay the **one-time $25 registration fee** (credit card)
4. Accept the Developer Distribution Agreement
5. Fill in your developer profile (name, email, etc.)

> This is a one-time fee — you can publish unlimited apps after this.

---

## STEP 6 — Create Your App on Play Console (~20 minutes)

1. Click **"Create app"**
2. Fill in:
   - **App name:** TipidCard – Grocery Budget
   - **Default language:** English (Philippines)
   - **App or game:** App
   - **Free or paid:** Free
3. Click **"Create app"**

### Complete the required sections:

#### App Content
- **Privacy Policy:** Required. Use this free generator: https://privacypolicygenerator.info
  - App name: TipidCard
  - No personal data collected (all data stored locally on device)
  - Copy the generated URL

#### Store Listing
- **Short description** (80 chars):
  `Track grocery spending, scan items & stay within budget. Para sa mga Pilipino!`
- **Full description** (4000 chars max):
```
TipidCard is a smart grocery budget tracker designed for Filipino shoppers.

🛒 FEATURES:
• Set your grocery budget and track spending in real-time
• Scan item barcodes or type item names manually
• Add quantity — see the total before you add (e.g. Milk x3 @ ₱15 = ₱45)
• Budget alerts when you're getting close to your limit
• Shopping history with date range filters
• Category breakdown charts
• Dark mode support
• Works fully offline — no internet needed after install
• No account, no sign-up — your data stays on your phone

💚 Made for Filipinos who want to be tipid (thrifty) at the palengke or supermarket!

Mag-ipon tayo! 🇵🇭
```

#### Screenshots (Required — at least 2)
- Open your app on phone or use Chrome DevTools (F12 → mobile view)
- Take screenshots of: Home screen, Add item form, History page, Charts
- Minimum size: 320x568px, Maximum: 3840x3840px
- Save as PNG or JPEG

#### App Icon
- Use your `icons/icon-512.png` as the high-res icon
- Play Store also needs a **Feature Graphic**: 1024x500px banner image
  - Make one free at: https://canva.com (search "Google Play Feature Graphic")

---

## STEP 7 — Upload Your AAB File

1. Go to **Release → Production → Create new release**
2. Click **"Upload"** and select your `tipidcard.aab` file
3. Add release notes:
   ```
   Version 1.0 — Initial release of TipidCard!
   • Budget tracking with real-time spending
   • Barcode/item name scanner
   • Quantity support with live total preview
   • Shopping history with date filters
   • Dark mode
   ```
4. Click **"Save"** → **"Review release"** → **"Start rollout to Production"**

---

## STEP 8 — Wait for Review

- Google reviews new apps in **3–7 business days**
- You'll get an email when it's approved or if there are issues
- Once approved, your app is live on the Play Store! 🎉

---

## After Publishing — Updating Your App

When you want to push an update:

1. Make changes to your `index.html`
2. Re-upload to Netlify (drag and drop again) — **same URL, instant update**
3. Users with the app installed get the update automatically via the service worker

For Play Store updates (optional — only if you change the TWA wrapper):
1. Go back to PWABuilder → generate new package
2. Use the **same `signing-key.jks`** file
3. Increase version code (e.g. `2`)
4. Upload new AAB to Play Console

---

## Frequently Asked Questions

**Q: Do users need internet to use TipidCard?**
A: No! After the first load, the service worker caches everything. The app works fully offline.

**Q: Can I change the Netlify URL later?**
A: Yes, but you'll need to regenerate the APK via PWABuilder with the new URL.

**Q: How do I add a custom domain like tipidcard.com?**
A: Buy a domain (~$10/year at Namecheap), add it in Netlify under Domain Settings, and update your APK URL in PWABuilder.

**Q: Is this a "real" app or just a website?**
A: It's a TWA (Trusted Web Activity) — it runs your web app in a full-screen Chrome shell with no browser chrome. Users cannot tell the difference from a native app.

**Q: Can I also publish to Apple App Store?**
A: Yes! PWABuilder also generates an iOS package. Apple App Store requires a Mac + Xcode + $99/year Apple Developer account.

---

## Quick Reference Links

| Tool | URL | Cost |
|------|-----|------|
| Netlify Hosting | https://netlify.com | Free |
| PWABuilder | https://pwabuilder.com | Free |
| Play Console | https://play.google.com/console | $25 one-time |
| Privacy Policy Generator | https://privacypolicygenerator.info | Free |
| Canva (Feature Graphic) | https://canva.com | Free |
| Lighthouse PWA Tester | Built into Chrome DevTools | Free |

---

*TipidCard v2.0.0 — PWA Guide*
*Good luck sa inyong app! Mabuhay! 🇵🇭*
