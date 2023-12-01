const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModel')

const getTareas = asyncHandler(async (req, res) => {

    const tareas = await Tarea.find({ user: req.user._id })

    res.status(200).json(tareas)
})

const createTarea = asyncHandler(async (req, res) => {
    if (!req.body.texto) {
        res.status(400)
        throw new Error('No escribiste una descripcion')
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user._id
    })

    res.status(201).json(tarea)
})

const updateTarea = asyncHandler(async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    //verificamos que la tarea existe
    if (!tarea) {
        res.status(400)
        throw new Error("Tarea no encontrada")
    }

    //verificamos que la tarea le pertenece al usuario del token proporcionado
    if (tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Acceso no autorizado")
    } else {
        const updatedTarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedTarea)
    }
})

const deleteTarea = asyncHandler(async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(400)
        throw new Error("Tarea no encontrada")
    }

    //verificamos que la tarea le pertenece al usuario del token proporcionado
    if (tarea.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Acceso no autorizado")
    } else {
        await Tarea.deleteOne(tarea)
        //2. const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)
        res.status(200).json({ id: req.params.id })
    }
})

module.exports = {
    getTareas,
    createTarea,
    updateTarea,
    deleteTarea
}