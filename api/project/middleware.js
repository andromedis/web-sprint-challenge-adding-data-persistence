// Imports
const Projects = require('./model')


async function checkProjectId(req, res, next) {
    const { project_id } = req.params
    try {
        const project = await Projects.getProjectById(project_id)
        if (project) {
            req.project = project
            next()
        }
        else {
            res.status(404).json({ message: `project with project_id ${project_id} not found` })
        }
    }
    catch (err) {
        next(err)
    }
}

function checkProjectPayload(req, res, next) {
    let { project_name, project_description, project_completed } = req.body
    const messages = []

    !project_name
        ? messages.push('project_name is required')
        : typeof project_name !== 'string'
            ? messages.push('project_name must be a string')
            : project_name.trim() === ''
                ? messages.push('project_name cannot be empty')
                : project_name.trim().length > 128
                    ? messages.push('project_name has a max of 128 characters')
                    : project_name = project_name.trim()
    
    !project_description 
        ? null
        : typeof project_description !== 'string'
            ? messages.push('project_description must be a string')
            : project_description.trim().length > 255
                ? messages.push('project_description has a max of 255 characters')
                : project_description = project_description.trim()
    
    !project_completed
        ? project_completed = false
        : project_completed === 0 || project_completed === 1
            ? project_completed = Boolean(project_completed)
            : typeof project_completed !== 'boolean'
                ? messages.push('project_completed must be a boolean')
                : null
    
    if (messages.length > 0) {
        res.status(400).json({ messages: messages })
    }
    else {
        req.body = {
            project_name,
            project_description,
            project_completed
        }
        next()
    }
}

// Exports
module.exports = {
    checkProjectId,
    checkProjectPayload
}
