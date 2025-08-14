
# Emergency Department Management System

واجهة لإدارة قسم الطوارئ بالمستشفى (أطباء، مرضى، حالات، أسِرّة، ممرضين) مع تحليلات ورسوم بيانية، مبنيّة بـ **React + Supabase**.

## 🔗 التجربة الحية
- **Demo**: https://rainbow-sawine-3064c2.netlify.app/

---

## ✨ المزايا
- حسابات ودخول (Supabase Auth).
- جداول موحّدة لخمسة كيانات: **Doctors / Patients / Cases / Beds / Nurses**.
- بحث فوري، ترتيب بالأعمدة، فلاتر حسب الحقول، وعرض/إضافة/تعديل/حذف عبر Dialogs.
- تحديث فوري بعد العمليات (Optimistic UI + Refetch).
- Dark Mode.
- رسوم بيانية: حالات حسب شدتها، حالة الأسرّة، وإضافات الأطباء شهريًا.

---

## 🧱 التقنية
- **React 18**, **Vite**.
- **Tailwind CSS** (+ HyperUI).
- **Supabase** (قاعدة بيانات + مصادقة).
- **Headless UI** للحوارات.
- **react-hook-form** و **zod** (اختياري) للتحقق.
- **Chart.js** + **react-chartjs-2**.
- **React Icons**.



## 🗄️ سكيمة قاعدة البيانات (Supabase SQL)
> عدّل الأسماء حسب احتياجك. القيود البسيطة مضافة كأمثلة.

```sql
-- Doctors
create table if not exists doctors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  specialty text,
  shift text check (shift in ('am','pm')),
  created_at timestamp default now()
);

-- Nurses
create table if not exists nurses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  shift text check (shift in ('am','pm')),
  created_at timestamp default now()
);

-- Beds
create table if not exists beds (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  room text,
  status text check (status in ('available','occupied')) default 'available',
  notes text,
  created_at timestamp default now()
);

-- Patients
create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age int,
  gender text check (gender in ('male','female')),
  status text check (status in ('in_er','admitted','discharged')) default 'in_er',
  bed_id uuid references beds(id),
  created_at timestamp default now()
);

-- Cases
create table if not exists cases (
  id uuid primary key default gen_random_uuid(),
  diagnosis text not null,
  severity text check (severity in ('low','medium','high')),
  patient_id uuid references patients(id) on delete cascade,
  doctor_id uuid references doctors(id),
  created_at timestamp default now()
);


## ⚙️ الإعداد والتشغيل
```bash
# 1) تنزيل المستودع
git clone <YOUR-REPO-URL>
cd <repo>

# 2) تثبيت الاعتمادات
npm install

# 3) ملف البيئة
cp .env.example .env
# عدّل القيم داخل .env

# 4) تشغيل المشروع
npm run dev
```

### .env.example
```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### سكريبتات npm
```
dev     : تشغيل محلي
build   : بناء النسخة الإنتاجية
preview : معاينة البناء
lint    : (اختياري) فحص الكود
```

---

## 🔌 ربط Supabase من الواجهة
```js
// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

## ♻️ CRUD عام لكل الجداول
```js
// src/lib/crud.js
import { supabase } from './supabaseClient';

export const list = async (table, { select='*', filters={} } = {}) => {
  let q = supabase.from(table).select(select);
  Object.entries(filters).forEach(([k,v]) => v!=null && (q = q.eq(k, v)));
  return q;
};

export const createItem = (table, payload) =>
  supabase.from(table).insert(payload).select().single();

export const updateItem = (table, id, payload) =>
  supabase.from(table).update(payload).eq('id', id).select().single();

export const removeItem = (table, id) =>
  supabase.from(table).delete().eq('id', id);
```

---

## 🧭 الجداول الخمسة (نفس الخصائص)

- **Doctors**: `id, name, phone, specialty, shift`
- **Patients**: `id, name, age, gender, status, bed_id`
- **Cases**: `id, diagnosis, severity, patient_id, doctor_id`
- **Beds**: `id, code, room, status, notes`
- **Nurses**: `id, name, phone, shift`

**مشترك بينهم:**
- جدول Responsive + بحث + Sort + فلاتر.
- Dialogs: View / Add / Edit / Delete.
- تحقق من المدخلات قبل الحفظ.
- إشعارات نجاح/خطأ.

---

## 📈 التحليلات
- Cases by Diagnosis (Low/Medium/High) – Bar chart.
- Beds Status (Available vs Occupied) – Bar chart.
- Doctors Additions (Last 12 Months) – Line/Bar.

---

## 🖼️ لقطات
> وضعت الصور في مجلد `screenshots/` الجاهز داخل المشروع.
- `screenshots/dashboard_light.png`
- `screenshots/dashboard_dark.png`
- `screenshots/analytics_beds.png`
- `screenshots/analytics_cases.png`
- `screenshots/dashboard_cards.png`
- `screenshots/signin.png`
- `screenshots/toast_signed_in.png`
- `screenshots/sidebar_emergency.png`

أضف في README الروابط هكذا:
```md
![Dashboard](./screenshots/dashboard_light.png)
```

---

## 🚢 النشر (Netlify)
- اربط المستودع على Netlify.
- Build command: `npm run build`
- Publish directory: `dist`
- متغيرات البيئة: أضف `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` من Settings → Build & deploy → Environment.

---

## 🧪 ملاحظات
- يفضّل إضافة تفويض أدوار لاحقًا (Admin/Staff).
- يمكن تفعيل محارف عربية بالكامل في البحث عبر normalizing النص.
- يوصى بإضافة اختبارات بسيطة للـ utils.

---

## 📄 الترخيص
استخدم الترخيص الذي تفضّله (MIT مقترح).
