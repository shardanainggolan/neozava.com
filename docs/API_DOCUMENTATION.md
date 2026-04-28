# API Documentation — Branch CRUD & Auth

Dokumentasi REST API untuk **Auth** serta cabang **Adira Finance**, **BFI Finance**, dan **WOM Finance**.

---

## Base URL

```
http://localhost:8081/api
```

> Sesuaikan port dengan konfigurasi `.env` (`PORT=8081`).

---

## Autentikasi

Endpoint **Create**, **Update**, dan **Delete** untuk semua cabang memerlukan token JWT.
Endpoint **Get** (baca data) bersifat publik, tidak memerlukan token.

### Cara mengirim token

Tambahkan header `Authorization` pada setiap request yang memerlukan autentikasi:

```
Authorization: Bearer <token>
```

---

## Auth Endpoint

### Login

```
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**

| Field      | Tipe   | Wajib | Keterangan          |
|------------|--------|-------|---------------------|
| `email`    | string | Ya    | Email pengguna      |
| `password` | string | Ya    | Password (min. 6 karakter) |

**Contoh Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "rahasia123"
}
```

**Contoh Response sukses (200):**

```json
{
  "code": 200,
  "status": "Ok",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "name": "Admin",
    "email": "admin@example.com"
  }
}
```

**Contoh Response gagal — email/password salah (401):**

```json
{
  "code": 401,
  "status": "Unauthorized",
  "message": "Email atau password salah"
}
```

**Contoh Request di Next.js:**

```js
async function login(email, password) {
  const res = await fetch('http://localhost:8081/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (json.code === 200) {
    // Simpan token — gunakan cookie HttpOnly atau localStorage
    localStorage.setItem('token', json.data.token);
  }

  return json;
}
```

> **Token berlaku selama 24 jam.** Setelah expired, pengguna harus login ulang.

---

## Cara Menggunakan Token di Halaman Admin (Next.js)

### Simpan token setelah login

```js
// Disarankan menyimpan di cookie HttpOnly via server action,
// atau localStorage jika tidak ada kekhawatiran XSS.
localStorage.setItem('token', json.data.token);
```

### Sertakan token di setiap request write

```js
const token = localStorage.getItem('token');

const res = await fetch('http://localhost:8081/api/bfi-branch', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
  body: formData,
});
```

### Redirect ke login jika token tidak ada / expired

```js
// middleware.js (Next.js)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## Region Endpoints (Provinsi, Kota, Kecamatan)

Digunakan untuk mengisi **select option** di form cabang. Semua endpoint region bersifat **publik** (tidak perlu token).

---

### Provinsi

#### Get All Provinces

```
GET /api/region/province
```

**Contoh Request:**

```js
fetch('http://localhost:8081/api/region/province')
```

**Contoh Response:**

```json
{
  "code": 200,
  "status": "Ok",
  "data": [
    { "provinceId": "11", "province": "Aceh" },
    { "provinceId": "12", "province": "Sumatera Utara" },
    { "provinceId": "32", "province": "Jawa Barat" },
    { "provinceId": "31", "province": "DKI Jakarta" }
  ]
}
```

#### Get Province by ID

```
GET /api/region/province/{provinceId}
```

**Contoh Response:**

```json
{
  "code": 200,
  "status": "Ok",
  "data": { "provinceId": "32", "province": "Jawa Barat" }
}
```

---

### Kabupaten / Kota

#### Get All Districts (dengan filter provinsi)

```
GET /api/region/district
GET /api/region/district?provinceId={provinceId}
```

| Query Param  | Keterangan                                    |
|--------------|-----------------------------------------------|
| `provinceId` | Opsional. Filter kabupaten/kota per provinsi. |

**Contoh Request:**

```js
// Semua kabupaten/kota
fetch('http://localhost:8081/api/region/district')

// Kabupaten/kota di Jawa Barat
fetch('http://localhost:8081/api/region/district?provinceId=32')
```

**Contoh Response:**

```json
{
  "code": 200,
  "status": "Ok",
  "data": [
    { "districtId": "3201", "provinceId": "32", "district": "Kabupaten Bogor",   "kdArea": "" },
    { "districtId": "3273", "provinceId": "32", "district": "Kota Bandung",      "kdArea": "" },
    { "districtId": "3271", "provinceId": "32", "district": "Kota Bogor",        "kdArea": "" }
  ]
}
```

#### Get District by ID

```
GET /api/region/district/{districtId}
```

---

### Kecamatan

#### Get All Sub-Districts (dengan filter kabupaten/kota)

```
GET /api/region/sub-district
GET /api/region/sub-district?districtId={districtId}
```

| Query Param  | Keterangan                                    |
|--------------|-----------------------------------------------|
| `districtId` | Opsional. Filter kecamatan per kabupaten/kota. |

**Contoh Request:**

```js
// Semua kecamatan di Kota Bandung
fetch('http://localhost:8081/api/region/sub-district?districtId=3273')
```

**Contoh Response:**

```json
{
  "code": 200,
  "status": "Ok",
  "data": [
    { "subDistrictId": "3273010", "districtId": "3273", "subDistrict": "Andir" },
    { "subDistrictId": "3273020", "districtId": "3273", "subDistrict": "Astanaanyar" }
  ]
}
```

#### Get Sub-District by ID

```
GET /api/region/sub-district/{subDistrictId}
```

---

### Chain Select — Contoh Implementasi Next.js

Alur chain select:
1. Load semua **provinsi** saat komponen pertama kali render
2. Saat user pilih provinsi → fetch **kabupaten/kota** dengan `?provinceId=`
3. Saat user pilih kabupaten/kota → fetch **kecamatan** dengan `?districtId=`

```jsx
'use client';

import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:8081/api';

export default function RegionSelect({ onChange }) {
  const [provinces,    setProvinces]    = useState([]);
  const [districts,    setDistricts]    = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

  const [provinceId,    setProvinceId]    = useState('');
  const [districtId,    setDistrictId]    = useState('');
  const [subDistrictId, setSubDistrictId] = useState('');

  // Load semua provinsi sekali saat mount
  useEffect(() => {
    fetch(`${BASE_URL}/region/province`)
      .then((r) => r.json())
      .then((json) => setProvinces(json.data ?? []));
  }, []);

  // Load kabupaten/kota saat provinsi berubah
  function handleProvinceChange(e) {
    const val = e.target.value;
    setProvinceId(val);
    setDistrictId('');
    setSubDistrictId('');
    setDistricts([]);
    setSubDistricts([]);

    if (!val) return;
    fetch(`${BASE_URL}/region/district?provinceId=${val}`)
      .then((r) => r.json())
      .then((json) => setDistricts(json.data ?? []));
  }

  // Load kecamatan saat kabupaten/kota berubah
  function handleDistrictChange(e) {
    const val = e.target.value;
    setDistrictId(val);
    setSubDistrictId('');
    setSubDistricts([]);

    if (!val) return;
    fetch(`${BASE_URL}/region/sub-district?districtId=${val}`)
      .then((r) => r.json())
      .then((json) => setSubDistricts(json.data ?? []));
  }

  function handleSubDistrictChange(e) {
    setSubDistrictId(e.target.value);
  }

  // Kirim nilai ke parent setiap ada perubahan
  useEffect(() => {
    if (onChange) onChange({ provinceId, districtId, subDistrictId });
  }, [provinceId, districtId, subDistrictId]);

  return (
    <div>
      {/* Select Provinsi */}
      <select value={provinceId} onChange={handleProvinceChange} required>
        <option value="">-- Pilih Provinsi --</option>
        {provinces.map((p) => (
          <option key={p.provinceId} value={p.provinceId}>
            {p.province}
          </option>
        ))}
      </select>

      {/* Select Kabupaten/Kota */}
      <select
        value={districtId}
        onChange={handleDistrictChange}
        disabled={!provinceId}
        required
      >
        <option value="">-- Pilih Kabupaten/Kota --</option>
        {districts.map((d) => (
          <option key={d.districtId} value={d.districtId}>
            {d.district}
          </option>
        ))}
      </select>

      {/* Select Kecamatan */}
      <select
        value={subDistrictId}
        onChange={handleSubDistrictChange}
        disabled={!districtId}
        required
      >
        <option value="">-- Pilih Kecamatan --</option>
        {subDistricts.map((s) => (
          <option key={s.subDistrictId} value={s.subDistrictId}>
            {s.subDistrict}
          </option>
        ))}
      </select>
    </div>
  );
}
```

**Penggunaan di form tambah cabang:**

```jsx
import RegionSelect from '@/components/RegionSelect';

export default function TambahCabangForm() {
  const [region, setRegion] = useState({
    provinceId: '', districtId: '', subDistrictId: '',
  });

  return (
    <form onSubmit={handleSubmit}>
      {/* ... field lain ... */}

      <RegionSelect onChange={setRegion} />

      {/* hidden field atau gunakan region.provinceId, dst saat submit */}
    </form>
  );
}
```

---

## Prefix Endpoint per Perusahaan

| Perusahaan    | Prefix           |
|---------------|------------------|
| Adira Finance | `/branch`        |
| BFI Finance   | `/bfi-branch`    |
| WOM Finance   | `/wom-branch`    |

Semua endpoint di bawah ini berlaku untuk ketiga perusahaan, cukup ganti prefix-nya.

---

## Branch Endpoints

### 1. Get All Branches — `PUBLIC`

Mengambil semua data cabang. Bisa difilter berdasarkan wilayah.

```
GET /api/{prefix}
```

**Query Parameters (opsional):**

| Parameter       | Tipe   | Keterangan                          |
|-----------------|--------|-------------------------------------|
| `provinceId`    | string | Filter berdasarkan ID provinsi (2 karakter) |
| `districtId`    | string | Filter berdasarkan ID kabupaten/kota (4 karakter) |
| `subDistrictId` | string | Filter berdasarkan ID kecamatan (7 karakter) |

**Aturan filter:**
- Tanpa parameter → tampil semua cabang
- Hanya `provinceId` → filter per provinsi
- `provinceId` + `districtId` → filter per kota
- `provinceId` + `districtId` + `subDistrictId` → filter per kecamatan

**Contoh Request:**

```js
// Semua cabang Adira
fetch('http://localhost:8081/api/branch')

// Cabang BFI di Jawa Barat (provinceId = "32")
fetch('http://localhost:8081/api/bfi-branch?provinceId=32')

// Cabang WOM di Kota Bandung
fetch('http://localhost:8081/api/wom-branch?provinceId=32&districtId=3273')
```

**Contoh Response:**

```json
{
  "code": 200,
  "status": "Ok",
  "data": [
    {
      "branchId": 1,
      "name": "Kantor Cabang Bandung",
      "slug": "kantor-cabang-bandung",
      "image": "kantor-cabang-bandung-1700000000.jpg",
      "description": "Cabang utama di Bandung",
      "address": "Jl. Asia Afrika No. 123, Bandung",
      "provinceId": "32",
      "districtId": "3273",
      "subDistrictId": "3273010",
      "postalCode": "40111",
      "telp1": "022-1234567",
      "telp2": "",
      "telp3": "",
      "fax1": "022-7654321",
      "fax2": "",
      "fax3": "",
      "latitude": "-6.921390",
      "longitude": "107.607277",
      "gmapsLink": "https://maps.google.com/?q=-6.921390,107.607277",
      "region": {
        "province": { "provinceId": "32", "province": "Jawa Barat" },
        "district": { "districtId": "3273", "provinceId": "32", "district": "Kota Bandung", "kdArea": "" },
        "subDistrict": { "subDistrictId": "3273010", "districtId": "3273", "subDistrict": "Andir" }
      }
    }
  ]
}
```

---

### 2. Get Branch by ID — `PUBLIC`

```
GET /api/{prefix}/{branchId}
```

**Contoh Request:**

```js
fetch('http://localhost:8081/api/branch/1')
fetch('http://localhost:8081/api/bfi-branch/5')
fetch('http://localhost:8081/api/wom-branch/3')
```

**Contoh Response:** sama seperti satu item di Get All.

---

### 3. Get Branch by Slug — `PUBLIC`

```
GET /api/{prefix}/slug/{slug}
```

**Contoh Request:**

```js
fetch('http://localhost:8081/api/branch/slug/kantor-cabang-bandung')
fetch('http://localhost:8081/api/bfi-branch/slug/kantor-cabang-jakarta')
fetch('http://localhost:8081/api/wom-branch/slug/kantor-cabang-surabaya')
```

---

### 4. Create Branch — `REQUIRES TOKEN`

```
POST /api/{prefix}
Content-Type: multipart/form-data
Authorization: Bearer <token>
```

**Form Fields:**

| Field           | Tipe   | Wajib | Keterangan                          |
|-----------------|--------|-------|-------------------------------------|
| `image`         | file   | Ya    | File gambar cabang                  |
| `name`          | string | Ya    | Nama cabang (maks. 200 karakter)    |
| `description`   | string | Ya    | Deskripsi cabang                    |
| `address`       | string | Ya    | Alamat lengkap (maks. 200 karakter) |
| `postalCode`    | string | Ya    | Kode pos (maks. 10 karakter)        |
| `latitude`      | string | Ya    | Koordinat latitude                  |
| `longitude`     | string | Ya    | Koordinat longitude                 |
| `gmapsLink`     | string | Ya    | Link Google Maps                    |
| `provinceId`    | string | Tidak | ID provinsi                         |
| `districtId`    | string | Tidak | ID kabupaten/kota                   |
| `subDistrictId` | string | Tidak | ID kecamatan                        |
| `telp1`         | string | Tidak | Nomor telepon 1                     |
| `telp2`         | string | Tidak | Nomor telepon 2                     |
| `telp3`         | string | Tidak | Nomor telepon 3                     |
| `fax1`          | string | Tidak | Nomor fax 1                         |
| `fax2`          | string | Tidak | Nomor fax 2                         |
| `fax3`          | string | Tidak | Nomor fax 3                         |

> `slug` di-generate otomatis dari `name` oleh server.

**Contoh Request (Next.js):**

```js
async function createBranch(formData, prefix = 'branch') {
  const token = localStorage.getItem('token');

  const data = new FormData();
  data.append('image',         formData.image);   // File object dari <input type="file">
  data.append('name',          formData.name);
  data.append('description',   formData.description);
  data.append('address',       formData.address);
  data.append('postalCode',    formData.postalCode);
  data.append('latitude',      formData.latitude);
  data.append('longitude',     formData.longitude);
  data.append('gmapsLink',     formData.gmapsLink);
  data.append('provinceId',    formData.provinceId    ?? '');
  data.append('districtId',    formData.districtId    ?? '');
  data.append('subDistrictId', formData.subDistrictId ?? '');
  data.append('telp1',         formData.telp1 ?? '');
  data.append('telp2',         formData.telp2 ?? '');
  data.append('telp3',         formData.telp3 ?? '');
  data.append('fax1',          formData.fax1  ?? '');
  data.append('fax2',          formData.fax2  ?? '');
  data.append('fax3',          formData.fax3  ?? '');

  const res = await fetch(`http://localhost:8081/api/${prefix}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Jangan set Content-Type, biarkan browser set boundary multipart
    },
    body: data,
  });

  return res.json();
}

// Penggunaan:
// createBranch(formData, 'branch')      → Adira
// createBranch(formData, 'bfi-branch')  → BFI
// createBranch(formData, 'wom-branch')  → WOM
```

**Contoh Response sukses:**

```json
{ "code": 200, "status": "Ok" }
```

**Contoh Response jika token tidak ada / expired (401):**

```json
{
  "code": 401,
  "status": "Unauthorized",
  "message": "Token tidak valid atau sudah expired"
}
```

---

### 5. Update Branch — `REQUIRES TOKEN`

> Update gambar tidak didukung di endpoint ini. Field `image` diisi dengan nama file yang sudah ada.

```
PATCH /api/{prefix}/{branchId}
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "Kantor Cabang Bandung (Updated)",
  "image": "nama-file-gambar-lama.jpg",
  "description": "Deskripsi baru",
  "address": "Jl. Baru No. 456, Bandung",
  "provinceId": "32",
  "districtId": "3273",
  "subDistrictId": "3273010",
  "postalCode": "40111",
  "telp1": "022-9999999",
  "telp2": "",
  "telp3": "",
  "fax1": "",
  "fax2": "",
  "fax3": "",
  "latitude": "-6.921390",
  "longitude": "107.607277",
  "gmapsLink": "https://maps.google.com/?q=-6.921390,107.607277"
}
```

**Contoh Request (Next.js):**

```js
async function updateBranch(branchId, formData, prefix = 'branch') {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://localhost:8081/api/${prefix}/${branchId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      name:          formData.name,
      image:         formData.image,
      description:   formData.description,
      address:       formData.address,
      provinceId:    formData.provinceId    ?? '',
      districtId:    formData.districtId    ?? '',
      subDistrictId: formData.subDistrictId ?? '',
      postalCode:    formData.postalCode,
      telp1:         formData.telp1 ?? '',
      telp2:         formData.telp2 ?? '',
      telp3:         formData.telp3 ?? '',
      fax1:          formData.fax1  ?? '',
      fax2:          formData.fax2  ?? '',
      fax3:          formData.fax3  ?? '',
      latitude:      formData.latitude,
      longitude:     formData.longitude,
      gmapsLink:     formData.gmapsLink,
    }),
  });

  return res.json();
}
```

---

### 6. Delete Branch — `REQUIRES TOKEN`

```
DELETE /api/{prefix}/{branchId}
Authorization: Bearer <token>
```

**Contoh Request (Next.js):**

```js
async function deleteBranch(branchId, prefix = 'branch') {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://localhost:8081/api/${prefix}/${branchId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return res.json();
}
```

---

## Struktur Response Umum

```json
{
  "code": 200,
  "status": "Ok",
  "data": { ... }
}
```

| Field    | Tipe              | Keterangan                                          |
|----------|-------------------|-----------------------------------------------------|
| `code`   | int               | HTTP status code                                    |
| `status` | string            | Status teks (`"Ok"` / `"Unauthorized"` / dll)       |
| `data`   | object/array/null | Data response, `null` untuk Create / Update / Delete |

---

## Struktur Data Branch

```json
{
  "branchId":      1,
  "name":          "Kantor Cabang Bandung",
  "slug":          "kantor-cabang-bandung",
  "image":         "kantor-cabang-bandung-1700000000.jpg",
  "description":   "Deskripsi cabang",
  "address":       "Jl. Asia Afrika No. 123, Bandung",
  "provinceId":    "32",
  "districtId":    "3273",
  "subDistrictId": "3273010",
  "postalCode":    "40111",
  "telp1":         "022-1234567",
  "telp2":         "",
  "telp3":         "",
  "fax1":          "022-7654321",
  "fax2":          "",
  "fax3":          "",
  "latitude":      "-6.921390",
  "longitude":     "107.607277",
  "gmapsLink":     "https://maps.google.com/?q=-6.921390,107.607277",
  "region": {
    "province": {
      "provinceId": "32",
      "province":   "Jawa Barat"
    },
    "district": {
      "districtId": "3273",
      "provinceId": "32",
      "district":   "Kota Bandung",
      "kdArea":     ""
    },
    "subDistrict": {
      "subDistrictId": "3273010",
      "districtId":    "3273",
      "subDistrict":   "Andir"
    }
  }
}
```

---

## Akses File Gambar

| Perusahaan    | URL Gambar                                              |
|---------------|---------------------------------------------------------|
| Adira Finance | `http://localhost:8081/uploads/branches/{filename}`     |
| BFI Finance   | `http://localhost:8081/uploads/bfi-branches/{filename}` |
| WOM Finance   | `http://localhost:8081/uploads/wom-branches/{filename}` |

```jsx
<img
  src={`http://localhost:8081/uploads/bfi-branches/${branch.image}`}
  alt={branch.name}
/>
```

---

## Contoh Alur Login Admin di Next.js

```jsx
// app/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('http://localhost:8081/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:    e.target.email.value,
        password: e.target.password.value,
      }),
    });

    const json = await res.json();
    setLoading(false);

    if (json.code === 200) {
      localStorage.setItem('token', json.data.token);
      router.push('/admin/dashboard');
    } else {
      setError('Email atau password salah');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email"    name="email"    placeholder="Email"    required />
      <input type="password" name="password" placeholder="Password" required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Masuk...' : 'Login'}
      </button>
    </form>
  );
}
```

---

## Daftar Lengkap Endpoint

| Method   | Endpoint                                        | Auth   | Keterangan                          |
|----------|-------------------------------------------------|--------|-------------------------------------|
| `POST`   | `/api/auth/login`                               | Tidak  | Login dan dapat token JWT           |
| `GET`    | `/api/region/province`                          | Tidak  | Semua provinsi                      |
| `GET`    | `/api/region/province/{provinceId}`             | Tidak  | Detail provinsi by ID               |
| `GET`    | `/api/region/district`                          | Tidak  | Semua kabupaten/kota                |
| `GET`    | `/api/region/district?provinceId={id}`          | Tidak  | Kabupaten/kota filter per provinsi  |
| `GET`    | `/api/region/district/{districtId}`             | Tidak  | Detail kabupaten/kota by ID         |
| `GET`    | `/api/region/sub-district`                      | Tidak  | Semua kecamatan                     |
| `GET`    | `/api/region/sub-district?districtId={id}`      | Tidak  | Kecamatan filter per kab/kota       |
| `GET`    | `/api/region/sub-district/{subDistrictId}`      | Tidak  | Detail kecamatan by ID              |
| `GET`    | `/api/branch`                     | Tidak  | Semua cabang Adira           |
| `GET`    | `/api/branch/{branchId}`          | Tidak  | Detail cabang Adira by ID   |
| `GET`    | `/api/branch/slug/{slug}`         | Tidak  | Detail cabang Adira by Slug |
| `POST`   | `/api/branch`                     | **Ya** | Tambah cabang Adira         |
| `PATCH`  | `/api/branch/{branchId}`          | **Ya** | Update cabang Adira         |
| `DELETE` | `/api/branch/{branchId}`          | **Ya** | Hapus cabang Adira          |
| `GET`    | `/api/bfi-branch`                 | Tidak  | Semua cabang BFI            |
| `GET`    | `/api/bfi-branch/{branchId}`      | Tidak  | Detail cabang BFI by ID     |
| `GET`    | `/api/bfi-branch/slug/{slug}`     | Tidak  | Detail cabang BFI by Slug   |
| `POST`   | `/api/bfi-branch`                 | **Ya** | Tambah cabang BFI           |
| `PATCH`  | `/api/bfi-branch/{branchId}`      | **Ya** | Update cabang BFI           |
| `DELETE` | `/api/bfi-branch/{branchId}`      | **Ya** | Hapus cabang BFI            |
| `GET`    | `/api/wom-branch`                 | Tidak  | Semua cabang WOM            |
| `GET`    | `/api/wom-branch/{branchId}`      | Tidak  | Detail cabang WOM by ID     |
| `GET`    | `/api/wom-branch/slug/{slug}`     | Tidak  | Detail cabang WOM by Slug   |
| `POST`   | `/api/wom-branch`                 | **Ya** | Tambah cabang WOM           |
| `PATCH`  | `/api/wom-branch/{branchId}`      | **Ya** | Update cabang WOM           |
| `DELETE` | `/api/wom-branch/{branchId}`      | **Ya** | Hapus cabang WOM            |
