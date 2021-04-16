// Imports
const Projects = require('../project/model')


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

module.exports = { checkTaskPayload }
