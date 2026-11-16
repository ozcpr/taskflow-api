---
title: "TaskFlow – Görev ve Proje Yönetim Sistemi API"
subtitle: "Proje Tanıtım Dokümanı"
author: "Ozan Kısrık · Backend Geliştirme Eğitimi · Kasım 2026"
---

# 1. Projenin Amacı

Bu projenin amacı, Node.js ile Backend Programlama eğitiminde öğrenilen konuları gerçek hayatta kullanılabilecek bir uygulama üzerinde göstermektir. Bu kapsamda bir yazılım ekibinin görevlerini yönetebileceği, tamamen REST API mantığında çalışan **TaskFlow** adlı bir servis geliştirilmiştir.

Projede Node.js çalışma ortamı, Express.js ile sunucu geliştirme, routing, middleware kullanımı, CRUD operasyonları ve JSON ile veri yönetimi konuları uygulanmıştır.

# 2. Senaryo

Bir yazılım şirketi, ekip içindeki görevleri ve çalışanların sorumluluklarını tek bir sistemden takip etmek istemektedir. Ekip lideri yeni görevler oluşturur, bu görevleri çalışanlara atar ve önceliklerini belirler. Çalışanlar görevlerin durumunu ilerledikçe günceller. Tamamlanan ya da iptal edilen görevler sistemden kaldırılabilir.

TaskFlow bu ihtiyacı bir API olarak karşılar. Bir web ya da mobil arayüz, bu API'yi kullanarak görev panosu oluşturabilir.

# 3. Sistem Özellikleri

- **Görev oluşturma:** Başlık, açıklama, atanan kişi, durum ve öncelik bilgileriyle yeni görev eklenir.
- **Görev listeleme:** Sistemdeki tüm görevler tek istekte görüntülenir.
- **Görev detayı:** Belirli bir görev, numarası (id) ile sorgulanır.
- **Görev güncelleme:** Görevin bilgileri, durumu ve önceliği değiştirilir.
- **Görev silme:** Görev sistemden kaldırılır.
- **Atama, durum ve öncelik yönetimi:** Her görevde atanan çalışan (`assignee`), durum (`pending`, `in-progress`, `completed`) ve öncelik (`low`, `medium`, `high`) alanları bulunur.
- **Logger middleware:** Gelen her isteğin method, endpoint ve zaman damgası konsola ve `logs/requests.log` dosyasına yazılır.
- **Hata yönetimi:** Bulunamayan kayıtlarda 404, eksik veya geçersiz veride 400 durum kodu ve açıklayıcı mesaj döner.

# 4. Veri Modeli

| Alan        | Tip    | Açıklama                                   |
|-------------|--------|--------------------------------------------|
| id          | number | Otomatik verilen benzersiz numara          |
| title       | string | Görev başlığı (zorunlu)                    |
| description | string | Görev açıklaması                           |
| assignee    | string | Görevin atandığı çalışan                   |
| status      | string | pending / in-progress / completed          |
| priority    | string | low / medium / high                        |
| createdAt   | string | Oluşturulma zamanı                         |
| updatedAt   | string | Son güncellenme zamanı                     |

Veriler `src/data/tasks.json` dosyasında saklanır. Bu sayede ek bir veri tabanı kurulumuna gerek kalmadan proje çalıştırılabilir.

# 5. API Tasarımı

| Method | Endpoint     | Açıklama                    | Başarılı Yanıt |
|--------|--------------|-----------------------------|----------------|
| POST   | /tasks       | Yeni görev ekler            | 201 Created    |
| GET    | /tasks       | Tüm görevleri listeler      | 200 OK         |
| GET    | /tasks/:id   | Görev detayını getirir      | 200 OK         |
| PUT    | /tasks/:id   | Görevi günceller            | 200 OK         |
| DELETE | /tasks/:id   | Görevi siler                | 200 OK         |

Tüm yanıtlar JSON formatındadır ve `success` alanı ile işlemin sonucunu belirtir.

# 6. Mimari ve Klasör Yapısı

Proje katmanlı bir yapıda düzenlenmiştir. İstek önce logger middleware'inden geçer, ardından router ilgili controller fonksiyonuna yönlendirir, controller da veri katmanı üzerinden JSON dosyasını okur ya da günceller.

- `src/server.js` – sunucuyu başlatır
- `src/app.js` – Express uygulamasını, middleware ve route bağlantılarını kurar
- `src/routes/` – endpoint tanımları
- `src/controllers/` – CRUD iş mantığı
- `src/middleware/` – logger middleware
- `src/data/` – veri okuma / yazma katmanı ve görev verileri

# 7. Test

Beş CRUD endpoint'inin tamamı çalışan sunucu üzerinde curl ile test edilmiştir; aynı istekler için bir Postman koleksiyonu da projeye eklenmiştir. Test ekran görüntüleri projenin `docs/screenshots/` klasöründe yer almaktadır. Kurulum ve çalıştırma adımları README dosyasında anlatılmıştır.

**GitHub:** https://github.com/ozcpr/taskflow-api
