# TaskFlow API

TaskFlow, bir yazılım ekibinin görevlerini takip etmesi için geliştirilmiş bir **Görev ve Proje Yönetim Sistemi REST API**'sidir. Node.js ve Express.js ile yazılmıştır. Görev ekleme, listeleme, detay görüntüleme, güncelleme ve silme (CRUD) işlemlerini destekler; tüm istekler bir logger middleware ile kayıt altına alınır.

## Kullanılan Teknolojiler

- Node.js (v18 veya üzeri)
- Express.js 4
- Veri saklama: JSON dosyası (`src/data/tasks.json`)

## Kurulum

1. Projeyi indirin:
   ```bash
   git clone https://github.com/ozcpr/taskflow-api.git
   cd taskflow-api
   ```
2. Bağımlılıkları kurun:
   ```bash
   npm install
   ```
3. Sunucuyu başlatın:
   ```bash
   npm start
   ```
4. Sunucu `http://localhost:3000` adresinde çalışır. Farklı bir port için `PORT` ortam değişkeni kullanılabilir (örnek: `PORT=4000 npm start`).

Geliştirme sırasında dosya değişikliklerinde otomatik yeniden başlatma için `npm run dev` komutu kullanılabilir.

## Klasör Yapısı

```
taskflow-api/
├── src/
│   ├── server.js                 # Sunucuyu başlatır
│   ├── app.js                    # Express uygulaması, middleware ve route bağlantıları
│   ├── routes/taskRoutes.js      # /tasks endpoint tanımları
│   ├── controllers/taskController.js  # CRUD iş mantığı
│   ├── middleware/logger.js      # İstek kayıt (logger) middleware'i
│   └── data/
│       ├── taskStore.js          # JSON dosyasını okuma / yazma
│       └── tasks.json            # Görev verileri
├── docs/                         # Proje tanıtım dokümanı ve Postman ekran görüntüleri
├── package.json
└── README.md
```

## Endpoint Listesi

| Method | Endpoint      | Açıklama                         |
|--------|---------------|----------------------------------|
| POST   | `/tasks`      | Yeni görev ekler                 |
| GET    | `/tasks`      | Tüm görevleri listeler           |
| GET    | `/tasks/:id`  | Belirli bir görevin detayını getirir |
| PUT    | `/tasks/:id`  | Görev bilgilerini günceller      |
| DELETE | `/tasks/:id`  | Görevi siler                     |

## Görev Veri Modeli

| Alan        | Tip    | Açıklama                                               |
|-------------|--------|--------------------------------------------------------|
| id          | number | Otomatik verilen benzersiz numara                      |
| title       | string | Görev başlığı (zorunlu)                                |
| description | string | Görev açıklaması                                       |
| assignee    | string | Görevin atandığı çalışan                               |
| status      | string | `pending`, `in-progress` veya `completed` (varsayılan: `pending`) |
| priority    | string | `low`, `medium` veya `high` (varsayılan: `medium`)     |
| createdAt   | string | Oluşturulma zamanı                                     |
| updatedAt   | string | Son güncellenme zamanı                                 |

## Örnek İstekler

**Görev ekleme**

```
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "README dosyasını yaz",
  "description": "Kurulum adımlarını anlat",
  "assignee": "Ozan",
  "priority": "low"
}
```

Yanıt (`201 Created`):

```json
{
  "success": true,
  "message": "Görev oluşturuldu",
  "data": {
    "id": 4,
    "title": "README dosyasını yaz",
    "description": "Kurulum adımlarını anlat",
    "assignee": "Ozan",
    "status": "pending",
    "priority": "low",
    "createdAt": "2026-11-16T14:29:07.907Z",
    "updatedAt": "2026-11-16T14:29:07.907Z"
  }
}
```

**Görev güncelleme**

```
PUT http://localhost:3000/tasks/4
Content-Type: application/json

{ "status": "completed", "priority": "high" }
```

**Görev silme**

```
DELETE http://localhost:3000/tasks/4
```

Bulunamayan görevlerde `404`, eksik veya hatalı veride `400` durum kodu ve açıklayıcı bir mesaj döner.

## Logger Middleware

Her istek için method, endpoint ve zaman damgası hem konsola hem de `logs/requests.log` dosyasına yazılır:

```
[2026-11-16T14:29:07.906Z] POST /tasks
[2026-11-16T14:29:07.917Z] GET /tasks
[2026-11-16T14:29:07.925Z] GET /tasks/4
```

## Test

Tüm endpoint'ler Postman ile test edilmiştir. Ekran görüntüleri `docs/screenshots/` klasöründedir.

## Hazırlayan

Ozan Kısrık – Software Persona Backend Geliştirme Eğitimi, 2026
