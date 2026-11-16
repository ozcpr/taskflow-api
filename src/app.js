// Express uygulaması: middleware'ler ve route'lar burada bağlanır
const express = require('express');
const logger = require('./middleware/logger');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Gelen JSON gövdesini okuyabilmek için
app.use(express.json());

// Tüm istekleri kayıt altına alan logger middleware
app.use(logger);

// Ana sayfa: API hakkında kısa bilgi
app.get('/', (req, res) => {
  res.json({
    name: 'TaskFlow API',
    description: 'Görev ve Proje Yönetim Sistemi',
    endpoints: {
      'POST /tasks': 'Yeni görev ekler',
      'GET /tasks': 'Tüm görevleri listeler',
      'GET /tasks/:id': 'Tek bir görevin detayını getirir',
      'PUT /tasks/:id': 'Görevi günceller',
      'DELETE /tasks/:id': 'Görevi siler'
    }
  });
});

// Görev yönetim modülü
app.use('/tasks', taskRoutes);

// Tanımlı olmayan adresler için 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint bulunamadı' });
});

// Hatalı JSON ve beklenmeyen hatalar için genel hata yakalayıcı
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Geçersiz JSON formatı' });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Sunucu hatası' });
});

module.exports = app;
