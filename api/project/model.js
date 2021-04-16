// Imports
const db = require('../../data/dbConfig')

// Project database functions
async function getProjects() {
    const projects = await db('projects')
    return Promise.resolve(
        projects.map(project => ({
            ...project,
            project_completed: Boolean(project.project_completed)
        }))
    )
}

async function getProjectById(project_id) {
    const project = await db('projects')
        .where({ project_id })
        .first()
    return Promise.resolve({
        ...project, 
        project_completed: Boolean(project.project_completed)
    })
}

async function addProject(project) {
    const [ project_id ] = await db('projects').insert(project)
    return getProjectById(project_id)
}

// Exports
module.exports = {
    getProjects,
    addProject
}