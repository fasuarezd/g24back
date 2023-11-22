const express = require('express')
const router = express.Router()
const { getTareas, createTarea, updateTarea, deleteTarea } = require('../controllers/tareasController')

//router.route('/').get(getTareas).post(createTarea)
//router.route('/:id').delete(deleteTarea).put(updateTarea)

//Obtener Tareas
router.get('/', getTareas)

//Crear una nueva Tarea
router.post('/', createTarea)

//Modificar una Tarea
router.put('/:id', updateTarea)

//Eliminar una Tarea
router.delete('/:id', deleteTarea)

module.exports = router