// Imports
const Resources = require('./model')


async function checkResourceId(req, res, next) {
    const { resource_id } = req.params
    try {
        const resource = await Resources.getResourceById(resource_id)
        if (resource) {
            req.resource = resource
            next()
        }
        else {
            res.status(404).json({ message: `resource with resource_id ${resource_id} not found`})
        }
    }
    catch (err) {
        next(err)
    }
}

async function checkResourcePayload(req, res, next) {
    let { resource_name, resource_description } = req.body
    const messages = []

    !resource_name
        ? messages.push('resource_name is required')
        : typeof resource_name !== 'string'
            ? messages.push('resource_name must be a string')
            : resource_name.trim() === ''
                ? messages.push('resource_name cannot be empty')
                : resource_name.trim().length > 128
                    ? messages.push('resource_name has a max of 128 characters')
                    : (await Resources.getResourceByName(resource_name))
                        ? messages.push('resource name must be unique')
                        : resource_name = resource_name.trim()
    
    !resource_description
        ? null
        : typeof resource_description !== 'string'
            ? messages.push('resource_description must be a string')
            : resource_description.trim().length > 255
                ? messages.push('resource_description has a max of 255 characters')
                : resource_description = resource_description.trim()
    
    if (messages.length > 0) {
        res.status(400).json({ messages: messages })
    }
    else {
        req.body = {
            resource_name,
            resource_description
        }
        next()
    }
}

// Exports
module.exports = {
    checkResourceId,
    checkResourcePayload
}
