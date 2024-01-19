const { Pool, Client } = require('pg')

const pool = new Pool({ 
    connectionString: 'postgresql://postgres:102030@localhost:5432/CRM',
    max:100
})

const client = new Client({ 
    connectionString: 'postgresql://postgres:102030@localhost:5432/CRM',
})

client.connect()

module.exports = {
    pool,
    client
}