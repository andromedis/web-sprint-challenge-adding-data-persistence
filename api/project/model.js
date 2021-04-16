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
    return db('projects').where({ project_id }).first()
}

async function addProject(project) {
    const [ project_id ] = await db('projects').insert(project)
    project = await getProjectById(project_id)
    return Promise.resolve({
        ...project, 
        project_completed: Boolean(project.project_completed)
    })
}

// Exports
module.exports = {
    getProjects,
    getProjectById,
    addProject
}
