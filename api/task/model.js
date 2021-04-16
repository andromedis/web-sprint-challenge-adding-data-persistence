// Imports
const db = require('../../data/dbConfig')

// Task database functions
async function getTasks() {
    const tasks = await db('tasks as t')
        .leftJoin('projects as p', 
            't.project_id', 'p.project_id')
        .select(
            't.task_id', 
            't.task_description', 
            't.task_notes', 
            't.task_completed', 
            'p.project_name', 
            'p.project_description'
        )
    return Promise.resolve(
        tasks.map(task => ({
            ...task,
            task_completed: Boolean(task.task_completed)
        }))
    )
}

async function getTaskById(task_id) {
    const task = await db('tasks')
        .where({ task_id })
        .first()
    return Promise.resolve({
        ...task, 
        task_completed: Boolean(task.task_completed)
    })
}

async function addTask(task) {
    const [ task_id ] = await db('tasks').insert(task)
    return getTaskById(task_id)
}

// Exports
module.exports = {
    getTasks,
    getTaskById,
    addTask
}
