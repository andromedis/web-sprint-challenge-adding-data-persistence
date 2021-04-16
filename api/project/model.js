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
    const project = await db('projects').where({ project_id }).first()
    if (project) {
        return Promise.resolve({
            ...project, 
            project_completed: Boolean(project.project_completed)
        })
    }
    else {
        return undefined
    }
}

async function addProject(project) {
    const [ project_id ] = await db('projects').insert(project)
    return getProjectById(project_id)
}

async function getProjectsByResourceId(resource_id) {
    return db('projects as p')
        .join('project_resources as pr', 'p.project_id', 'pr.project_id')
        .join('resources as r', 'pr.resource_id', 'r.resource_id')
        .select('p.*')
        .where('r.resource_id', resource_id)
}

// Exports
module.exports = {
    getProjects,
    getProjectById,
    addProject,
    getProjectsByResourceId
}
