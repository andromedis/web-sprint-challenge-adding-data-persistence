// Imports
const db = require('../../data/dbConfig')

// Resource database functions
function getResources() {
    return db('resources')
}

function getResourceById(resource_id) {
    return db('resources').where({ resource_id }).first()
}

function getResourceByName(resource_name) {
    return db('resources').where({ resource_name }).first()
}

async function addResource(resource) {
    const [ resource_id ] = await db('resources').insert(resource)
    return getResourceById(resource_id)
}

async function getResourcesByProjectId(project_id) {
    return db('resources as r')
        .join('project_resources as pr', 'r.resource_id', 'pr.resource_id')
        .join('projects as p', 'pr.project_id', 'p.project_id')
        .select('r.*')
        .where('p.project_id', project_id)
}

// Exports
module.exports = {
    getResources,
    getResourceById,
    getResourceByName,
    addResource,
    getResourcesByProjectId
}
