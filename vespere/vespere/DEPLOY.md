# VESPÈRE — joylashtirish yo'riqnomasi (o'zbekcha)

## 0. Talablar
- Node.js 20 yoki yangiroq (`node -v` bilan tekshiring), internet (paketlarni yuklash uchun).
- Papka ichida `public/frames/d/` va `public/frames/m/` (har biri 701 ta `cNNN.webp`) bo'lishi shart.

## 1. Kompyuteringizda ishga tushirish
```
npm install
npm run dev        # http://localhost:5173 da ochiladi
```
Tekshirish: `npm run lint` (TypeScript), `npm run build` (haqiqiy yig'ish → `dist/`), `npm run preview`.

## 2. Joylashtirish (3 yo'l, istalgan biri)

### A) Vercel (eng oson)
1. Loyihani GitHub'ga yuklang (`node_modules` va `dist` ni yuklamang — `.gitignore` allaqachon bor).
2. vercel.com → *Add New → Project* → repozitoriyani tanlang.
3. Framework: **Vite** (o'zi aniqlaydi). Build: `npm run build`, Output: `dist`. *Deploy*.
`vercel.json` kadrlar uchun uzoq muddatli keshni o'zi qo'yadi.

### B) Netlify
- Repozitoriyadan: *Add new site → Import*. `netlify.toml` tayyor (build `npm run build`, publish `dist`).
- Yoki qo'lda: kompyuterda `npm run build`, so'ng **`dist` papkasini** app.netlify.com/drop sahifasiga tashlang.
`public/_headers` keshni sozlaydi.

### C) Cloudflare Pages
Build command: `npm run build`, output: `dist`. (`_headers` ishlaydi.) Kadrlar ko'p bo'lgani uchun
trafik cheklovi bo'lmagan xizmat qulay.


### D) Railway (GitHub orqali)
Loyiha Railway uchun tayyor: `npm run build` saytni `dist/` ga yig'adi, `npm start` uni `serve` bilan beradi
(`PORT` ni Railway o'zi qo'yadi).
1. Loyiha GitHub'da bo'lsin (pastdagi "GitHub'ga yuklash" bo'limi).
2. railway.com → *New Project → Deploy from GitHub repo* → repozitoriyani tanlang.
3. Build/Start'ni o'zgartirish shart emas. Agar so'rasa: Build `npm run build`, Start `npm start`.
4. Servis → *Settings → Networking → Generate Domain*. Hosil bo'lgan `xxx.up.railway.app` havolani do'stlarga yuboring.
5. Keyingi o'zgarishlar: `git push` qilsangiz Railway o'zi qayta yig'adi.

## GitHub'ga yuklash (buyruq qatori)
Brauzerdan yuklash 100 fayldan oshmaydi, kadrlar esa 1400 ta, shuning uchun `git` kerak.
```
cd vespere
git init -b main
git add .
git commit -m "VESPÈRE site"
# github.com da bo'sh repozitoriy yarating (README/gitignore QO'SHMANG), so'ng:
git remote add origin https://github.com/FOYDALANUVCHI/vespere.git
git push -u origin main
```
`node_modules` va `dist` `.gitignore` da, ular yuklanmaydi. Jami ~42 MB, GitHub limitiga sig'adi.

## 3. Ulangandan keyin
- **Domen:** xizmat panelidagi *Domains* bo'limidan qo'shing.
- **Link ko'rinishi (Telegram/Facebook):** `index.html` ichidagi `og:image` ni to'liq manzilga
  almashtiring, masalan `https://sizning-domen.uz/og.jpg`.
- **Brend, narx, valyuta, matn:** `src/content.ts` (valyuta — oxiridagi `formatPrice`).
- **Savat:** hozir faqat namoyish; "Checkout" ulanmagan. To'lov kerak bo'lsa Stripe/Click/Payme
  ulash alohida ish.

## 4. Videoni almashtirsangiz (yangi kadrlar)
Yangi tayyor film `film.mp4` bo'lsa:
```
rm -f public/frames/d/* public/frames/m/*
ffmpeg -i film.mp4 -vf "fps=24,scale=1280:-2" -c:v libwebp -quality 75 public/frames/d/c%03d.webp
ffmpeg -i film.mp4 -vf "fps=24,scale=768:-2"  -c:v libwebp -quality 75 public/frames/m/c%03d.webp
ls public/frames/d | wc -l     # shu son = FRAME_COUNT
```
So'ng yangilang:
1. `src/lib/frames.ts` → `FRAME_COUNT`.
2. `src/lib/timeline.ts` → `HOLD_SECONDS` (kartochka to'xtaydigan soniyalar), `BEATS`,
   `FOCAL` (soat joyi 0–1), va yangi klipda logo/matn bo'lmasa `VEIL_FRAMES` ni olib tashlash mumkin
   (Stage'dagi xiralashtirish o'chadi: `VEIL_FRAMES = [0, 0]`).

## 5. Ma'lum cheklovlar (halol ro'yxat)
- **Siferblatdagi toj-logo va buzilgan matn** (AI video, ~236–405-kadrlar). Sayt uni xiralashtiradi va
  1-kartochkani toza kadrda to'xtatadi, lekin ommaga chiqarishdan oldin klipni almashtirish tavsiya
  etiladi (savdo belgisiga o'xshashligi uchun).
- Klip chegaralarida fon rangi o'zgaradi (to'q sariq → sovuq ko'k-yashil).
- Telefon gorizontal (landscape) holatida kartochka siqiq bo'lishi mumkin; asosiy hisob portretga.
- Hajm: desktop ~28 MB, telefon ~15 MB kadr (progressiv yuklanadi, sekin tarmoqda/Save-Data'da
  yengil to'plam avtomatik tanlanadi).
