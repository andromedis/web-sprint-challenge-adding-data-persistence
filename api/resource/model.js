// Imports
const db = require('../../data/dbConfig')

// Resource database functions
function getResources() {
    return db('resources')
}

async function addResource(resource) {
    const [ resource_id ] = await db('resources').insert(resource)
    return getResources().where({ resource_id }).first()
}

// Exports
module.exports = {
    getResources,
    addResource
}