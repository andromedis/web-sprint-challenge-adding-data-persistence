const Resources = require('../resource/model')
const Projects = require('../project/model')

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


async function checkTaskPayload(req, res, next) {
    let { task_description, task_notes, task_completed, project_id } = req.body
    const messages = []

    !task_description
        ? messages.push('task_description is required')
        : typeof task_description !== 'string'
            ? messages.push('task_description must be a string')
            : task_description.trim() === ''
                ? messages.push('task_description cannot be empty')
                : task_description.trim().length > 128
                    ? messages.push('task_description has a max of 128 characters')
                    : task_description = task_description.trim()

    !task_notes
        ? null
        : typeof task_notes !== 'string'
            ? messages.push('task_notes must be a string')
            : task_notes.trim().length > 255
                ? messages.push('task_notes has a max of 255 characters')
                : task_notes = task_notes.trim()

    !task_completed
        ? task_completed = false
        : task_completed === 0 || task_completed === 1
            ? task_completed = Boolean(task_completed)
            : typeof task_completed !== 'boolean'
                ? messages.push('task_completed must be a boolean')
                : null

    !project_id
        ? messages.push('project_id is required')
        : !Number.isInteger(project_id)
            ? messages.push('project_id must be an integer')
            : !(await Projects.getProjectById(project_id))
                ? messages.push(`project with project_id ${project_id} does not exist`)
                : null

    if (messages.length > 0) {
        res.status(400).json({ messages: messages })
    }
    else {
        req.body = {
            task_description,
            task_notes,
            task_completed,
            project_id
        }
        next()
    }
}


module.exports = {
    checkProjectPayload,
    checkResourcePayload,
    checkTaskPayload
}
