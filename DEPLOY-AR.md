# نشر IRON HOUSE FITNESS أونلاين (للمبتدئين)

المشروع موقع ثابت (HTML/CSS/JS) بدون تثبيت أو بناء، وهو جاهز للنشر كما هو. تحتاج حسابين مجانيين: **GitHub** و**Vercel**. كل الخطوات تتم من المتصفح، ولا تحتاج تثبيت أي برنامج.

## الطريقة (أ): مشروع مستقل برابط خاص (الأفضل لمعرض الأعمال)

### 1) إنشاء مستودع على GitHub
1. ادخل https://github.com وسجّل الدخول.
2. اضغط **New repository** (علامة + أعلى الصفحة).
3. الاسم: `iron-house-fitness`، واختر **Public**، ولا تضف README ولا .gitignore، ثم **Create repository**.

### 2) رفع الملفات
1. في صفحة المستودع الجديد اضغط الرابط **uploading an existing file**.
2. افتح مجلد المشروع على جهازك: `C:\Users\moham\Documents\My Projects\iron-house-fitness`
3. حدّد **كل محتوياته** (Ctrl + A) واسحبها إلى صفحة GitHub. يجب أن ترفع المجلدات `css` و`js` و`assets` مع الملفات `index.html` و`dashboard.html` و`privacy.html` و`vercel.json` وغيرها.
4. انتظر انتهاء الرفع، واكتب أي رسالة مثل `first version`، ثم **Commit changes**.
5. تأكد أن `index.html` ظاهر في **أول** صفحة المستودع (ليس داخل مجلد فرعي).

### 3) النشر على Vercel
1. ادخل https://vercel.com واختر **Continue with GitHub**.
2. اضغط **Add New → Project**، ثم **Import** بجانب `iron-house-fitness`.
3. اترك الإعدادات كما هي: **Framework Preset = Other**، وبدون Build Command وبدون Output Directory.
4. اضغط **Deploy**. بعد دقيقة تحصل على رابط مثل `https://iron-house-fitness-xxxx.vercel.app`.

### 4) اختبره
افتح الرابط وجرّب: الصفحة الرئيسية، زر **العربية**، فتح برنامج وتمرين، الحجز، الحاسبة، `dashboard.html`، `privacy.html`.

### 5) ربطه بموقعك الشخصي
في ملف `script.js` الخاص بموقعك غيّر كارت المشروع:
```js
code: "https://github.com/mohammedelsherben/iron-house-fitness",
live: "https://رابط-vercel-الخاص-بك.vercel.app",
```
وارفع `script.js` المعدّل إلى مستودع موقعك على GitHub (Add file → Upload files). Vercel ينشر تلقائيًا بعد كل تحديث. بعدها يمكنك حذف النسخة القديمة `portfolio/projects/iron-house-fitness` إن أردت.

### 6) تحديث ملفات SEO بالرابط الحقيقي
بعد معرفة الرابط (أو دومينك الخاص) استبدل `your-domain.example` في `robots.txt` و`sitemap.xml`. وأضف `<link rel="canonical" href="رابطك">` داخل `<head>` في `index.html`.

## الطريقة (أ-2): الرفع بـ Git من الجهاز (بعد تثبيت Git)
المستودع المحلي جاهز وفيه أول commit. افتح **نافذة PowerShell جديدة** (حتى يتعرف على Git)، ثم:
1. أنشئ مستودعًا **فارغًا** على GitHub باسم `iron-house-fitness` (بدون README).
2. نفّذ هذه الأوامر:
```
cd "C:\Users\moham\Documents\My Projects\iron-house-fitness"
git remote add origin https://github.com/mohammedelsherben/iron-house-fitness.git
git push -u origin main
```
3. ستظهر نافذة تسجيل دخول إلى GitHub في المتصفح. سجّل الدخول ووافق.
4. أكمل بعدها من **خطوة 3 (النشر على Vercel)** أعلاه.
لاحقًا لتحديث الموقع: `git add -A` ثم `git commit -m "وصف التعديل"` ثم `git push`.

## الطريقة (ب): داخل موقعك الحالي (أسرع)
1. ادخل مستودع موقعك على GitHub: https://github.com/mohammedelsherben/Portfolio
2. **Add file → Upload files**، واسحب مجلد `projects` و`script.js` من `C:\Users\moham\Documents\My Projects\portfolio`، ثم **Commit changes**.
3. بعد دقيقة يظهر المشروع على: `https://portfolio-mohammedelsherben.vercel.app/projects/iron-house-fitness/`
> العيب: لا يكون للمشروع مستودع مستقل، فلا يمكنك وضع رابط "الكود" له.

## لتحديث الموقع لاحقًا
عدّل الملف في GitHub مباشرة (أيقونة القلم) أو ارفع النسخة الجديدة بنفس الطريقة، وVercel ينشر تلقائيًا.

## مشاكل شائعة
- **صفحة 404:** `index.html` ليس في جذر المستودع. أعد الرفع بدون المجلد الخارجي.
- **الأشكال بدون تنسيق:** لم يُرفع مجلد `css` أو `js`.
- **الصور لا تظهر:** تأتي من Unsplash وتحتاج إنترنت.
- **الحجوزات والاشتراكات تختفي على جهاز آخر:** طبيعي، فهي محفوظة في متصفح كل زائر (نسخة تجريبية بلا خادم).
