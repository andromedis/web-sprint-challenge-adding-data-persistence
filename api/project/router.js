// Imports
const router = require('express').Router()
const Projects = require('./model')
const Resources = require('../resource/model')
const Tasks = require('../task/model')
const mw = require('./middleware')


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

router.post('/', mw.checkProjectPayload, async (req, res, next) => {
    try {
        const project = await Projects.addProject(req.body)
        res.status(201).json(project)
    }
    catch (err) {
        next(err)
    }
})

// Stretch Endpoints
router.get('/:project_id', mw.checkProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.get('/:project_id/resources', mw.checkProjectId, async (req, res, next) => {
    const project_id = parseInt(req.params.project_id)
    const { project_name, project_description, project_completed } = req.project
    try {
        const resources = await Resources.getResourcesByProjectId(project_id)
        const data = {
            project_id,
            project_name,
            project_description,
            project_completed,
            resources
        }
        res.status(200).json(data)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:project_id/tasks', mw.checkProjectId, async (req, res, next) => {
    const project_id = parseInt(req.params.project_id)
    const { project_name, project_description, project_completed } = req.project
    try {
        const tasks = await Tasks.getTasksByProjectId(project_id)
        const data = {
            project_id,
            project_name,
            project_description,
            project_completed,
            tasks
        }
        res.status(200).json(data)
    }
    catch (err) {
        next(err)
    }
})


// Exports
module.exports = router
