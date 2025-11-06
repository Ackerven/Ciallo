# 🌸 Ciallo ～(∠・ω< )⌒★

A cheerful little Vue3 project that says “**Ciallo!**” to the world 💫

Refactored from [qxdn/ciallo](https://github.com/qxdn/ciallo) — now cuter, smoother, and more mobile-friendly 💕

---

## 🎀 What’s New?

1. **💎 Responsive Layout**

   Works beautifully on phones, tablets, and desktops — because Ciallo deserves to shine everywhere ✨

2. **🌠 Endless Flying Ciallos**

   The "Ciallo ～(∠・ω< )⌒★" texts now appear and drift by randomly — no more looping in a fixed pattern!

3. **🎨 Meguru Color Magic**

   Every "Ciallo ～(∠・ω< )⌒★" gets its own color, softly blended from 因幡めぐる’s palette 💖💛💙

---

> [!IMPORTANT]
> Anywhere you see something in `<brackets>` — like `<repository-name>` or `<yourdomain.com>` —
> just swap it with your own info! ✨

## 💻 How to Start

### 1. Clone this cutie

```bash
git clone https://github.com/ackerven/Ciallo.git
cd Ciallo
```

### 2. Install dependencies

> ⚠️ Use **pnpm**! It’s faster, lighter, and happier 🎶

```bash
pnpm install
```

### 3. Run it locally

```bash
pnpm dev
```

Then open 👉 `http://localhost:5173` in your browser and say **Ciallo!**

---

## 🚀 Deploy to the World

This project automatically deploys to **GitHub Pages** whenever you push to the `master` branch.

So just commit, push, and — *poof!* — it’s live ✨

---

### 🧭 Default setup

1. Add a `base` in `vite.config.js` with your repo name:

   ```js
   export default defineConfig({
     // other config
     base: '/<repository-name>/'
     // other config
   })
   ```

2. Make sure you commit and push to **master**:

   ```bash
   git add .
   git commit -m "Say Ciallo!"
   git push origin master
   ```

3. Once the push is complete, GitHub Actions will automatically build and deploy your site 🎉

   Visit your live page at `https://<username>.github.io/<repository-name>`

> [!TIP]
> If you want to deploy from a branch other than `master` (for example, `main`):
>
> Open `.github/workflows/deploy.yml` and modify the following lines:
>
> ```yaml
> on:
>   push:
>     branches:
>       - master  # ← change this to your branch name
> ```
>
> Save and commit — the workflow will now deploy from your custom branch 🚀

---

### 🌐 Custom domain (Optional)

Want your own cozy little address? 🏡

To set up a custom domain:

1. Open your `vite.config.js` and make sure the `base` option is set to `'/'`:

   ```js
   export default defineConfig({
     // other config
     base: '/',
    // other config
   })
   ```

2. Go to **Settings → Variables → Repository variables**  
3. Add a new variable named `CNAME`, and set its value to `<yourdomain.com>`  
4. In your domain DNS settings, add a **CNAME record** that points `<yourdomain.com>` to `<username>.github.io`  

GitHub Pages will automatically generate a `CNAME` file for you 💌

> [!WARNING]
> When using a **custom domain**, `base` must be `'/'`.
>
> If you leave it as `/<repository>/`, your site may not load correctly on GitHub Pages.

---

## 🧩 Built With

- 🥰 [Vue 3](https://vuejs.org/) — the core of our cuteness
- ⚡ [Vite](https://vitejs.dev/) — super-fast dev & build tool
- 📦 [pnpm](https://pnpm.io/) — efficient and lightweight
- 💅 Scoped CSS + Composition API
- ☁️ Auto-deploy via GitHub Pages

---

## 💖 Credits

- Original project: [qxdn/ciallo](https://github.com/qxdn/ciallo)  
- Rebuilt with ❤️ using Vue 3  
- Color theme inspired by 因幡めぐる (*Inaba Meguru*) 🌷  

---

## 📜 License

GPL v3.0 License © 2025 Ackerven

> Ciallo~ Have a bright and colorful day! (∠・ω< )⌒★
