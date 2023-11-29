const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModel')

const getTareas = asyncHandler(async (req, res) => {

    const tareas = await Tarea.find()

    res.status(200).json(tareas)
})

const createTarea = asyncHandler(async (req, res) => {
    if (!req.body.texto) {
        res.status(400)
        throw new Error('No escribiste una descripcion')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto
    })

    res.status(201).json(tarea)
})

const updateTarea = asyncHandler(async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(400)
        throw new Error("Tarea no encontrada")
    }

    const updatedTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })


    res.status(200).json(updatedTarea)
})

const deleteTarea = asyncHandler(async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(400)
        throw new Error("Tarea no encontrada")
    }

    await Tarea.deleteOne(tarea)
    //2. const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getTareas,
    createTarea,
    updateTarea,
    deleteTarea
}