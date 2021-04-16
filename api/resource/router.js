// Imports
const router = require('express').Router()
const Resources = require('./model')
const mw = require('../middleware/middleware')


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


// Exports
module.exports = router
