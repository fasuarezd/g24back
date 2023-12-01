const express = require('express')
const router = express.Router()
const { getTareas, createTarea, updateTarea, deleteTarea } = require('../controllers/tareasController')
const { protect } = require('../middleware/authMiddleware')

//router.route('/').get(protect, getTareas).post(protect, createTarea)
//router.route('/:id').delete(protect, deleteTarea).put(protect, updateTarea)

//Obtener Tareas
router.get('/', protect, getTareas)

//Crear una nueva Tarea
router.post('/', protect, createTarea)

//Modificar una Tarea
router.put('/:id', protect, updateTarea)

//Eliminar una Tarea
router.delete('/:id', protect, deleteTarea)

module.exports = router