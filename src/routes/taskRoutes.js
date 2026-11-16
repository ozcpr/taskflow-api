// Görev (task) endpoint'lerinin tanımlandığı router
const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/', taskController.createTask);      // Görev ekleme
router.get('/', taskController.getAllTasks);      // Görev listeleme
router.get('/:id', taskController.getTaskById);   // Görev detayı
router.put('/:id', taskController.updateTask);    // Görev güncelleme
router.delete('/:id', taskController.deleteTask); // Görev silme

module.exports = router;
