// Imports
const router = require('express').Router()
const Projects = require('./model')

// Endpoints
router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.getProjects()
        res.status(200).json(projects)
    }
    catch (err) {
        next(err)
    }

})

router.post('/', async (req, res, next) => {
    try {
        const project = await Projects.addProject(req.body)
        res.status(201).json(project)
    }
    catch (err) {
        next(err)
    }
})

// Exports
module.exports = router