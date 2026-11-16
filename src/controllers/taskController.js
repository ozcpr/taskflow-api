// Görev yönetim modülünün iş mantığı (CRUD operasyonları)
const { readTasks, writeTasks } = require('../data/taskStore');

const STATUSES = ['pending', 'in-progress', 'completed'];
const PRIORITIES = ['low', 'medium', 'high'];

// Gönderilen alanların geçerli olup olmadığını kontrol eder
function findError(body) {
  if (body.status !== undefined && !STATUSES.includes(body.status)) {
    return `status şu değerlerden biri olmalıdır: ${STATUSES.join(', ')}`;
  }
  if (body.priority !== undefined && !PRIORITIES.includes(body.priority)) {
    return `priority şu değerlerden biri olmalıdır: ${PRIORITIES.join(', ')}`;
  }
  return null;
}

// POST /tasks - Yeni görev oluşturur
function createTask(req, res) {
  const { title, description, assignee, status, priority } = req.body || {};

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ success: false, message: 'title alanı zorunludur' });
  }
  const error = findError(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const tasks = readTasks();
  const now = new Date().toISOString();
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title: title.trim(),
    description: description || '',
    assignee: assignee || null,
    status: status || 'pending',
    priority: priority || 'medium',
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json({ success: true, message: 'Görev oluşturuldu', data: newTask });
}

// GET /tasks - Tüm görevleri listeler
function getAllTasks(req, res) {
  const tasks = readTasks();
  res.json({ success: true, count: tasks.length, data: tasks });
}

// GET /tasks/:id - Belirli bir görevi getirir
function getTaskById(req, res) {
  const task = readTasks().find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ success: false, message: 'Görev bulunamadı' });
  }
  res.json({ success: true, data: task });
}

// PUT /tasks/:id - Görev bilgilerini günceller
function updateTask(req, res) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Görev bulunamadı' });
  }

  const body = req.body || {};
  if (body.title !== undefined && (typeof body.title !== 'string' || body.title.trim() === '')) {
    return res.status(400).json({ success: false, message: 'title alanı boş olamaz' });
  }
  const error = findError(body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  // Sadece izin verilen alanlar güncellenir; id ve createdAt değişmez
  const allowed = ['title', 'description', 'assignee', 'status', 'priority'];
  const updated = { ...tasks[index] };
  allowed.forEach((field) => {
    if (body[field] !== undefined) {
      updated[field] = field === 'title' ? body[field].trim() : body[field];
    }
  });
  updated.updatedAt = new Date().toISOString();

  tasks[index] = updated;
  writeTasks(tasks);

  res.json({ success: true, message: 'Görev güncellendi', data: updated });
}

// DELETE /tasks/:id - Görevi sistemden kaldırır
function deleteTask(req, res) {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Görev bulunamadı' });
  }

  const [deleted] = tasks.splice(index, 1);
  writeTasks(tasks);

  res.json({ success: true, message: 'Görev silindi', data: deleted });
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
