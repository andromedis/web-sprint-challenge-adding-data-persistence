// Imports
const router = require('express').Router()
const Resources = require('./model')
const Projects = require('../project/model')
const mw = require('./middleware')


// Endpoints
router.get('/', async (req, res, next) => {
    try {
        const resources = await Resources.getResources()
        res.status(200).json(resources)
    }
    catch (err) {
        next(err)
    }
})

router.post('/', mw.checkResourcePayload, async (req, res, next) => {
    try {
        const resource = await Resources.addResource(req.body)
        res.status(201).json(resource)
    }
    catch (err) {
        next(err)
    }
})

// Stretch Endpoints
router.get('/:resource_id', mw.checkResourceId, (req, res) => {
    res.status(200).json(req.resource)
})

router.get('/:resource_id/projects', mw.checkResourceId, async (req, res, next) => {
    const resource_id = parseInt(req.params.resource_id)
    const { resource_name, resource_description } = req.resource
    try {
        const projects = await Projects.getProjectsByResourceId(resource_id)
        const data = {
            resource_id,
            resource_name,
            resource_description,
            projects
        }
        res.status(200).json(data)
    }
    catch (err) {
        next(err)
    }
})


// Exports
module.exports = router
