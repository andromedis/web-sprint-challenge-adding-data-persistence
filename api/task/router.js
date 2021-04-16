// Imports
const router = require('express').Router()
const Tasks = require('./model')

// Endpoints
router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getTasks()
        res.status(200).json(tasks)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const task = await Tasks.addTask(req.body)
        res.status(201).json(task)
    }
    catch (err) {
        next(err)
    }
})

// Exports
module.exports = router