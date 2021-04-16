// start your server here
const server = require('./api/server')

const PORT = process.env.PORT || 1234

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})