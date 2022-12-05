const express = require('express')
const { Pool } = require('pg')

require('dotenv').config()

const PORT = 3333


const pool = new Pool({
    connectionString: process.env.POSTRGRES_URL
})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {console.log('ServidoR on')} )


app.get('/usuarios', async (req, res) => {
    
    try{ 
        const { rows } = await pool.query('SELECT * from usuarios')
        return res.status(200).send(rows)
    } catch(err) {
        return res.status(400).send(err)
    }
})

app.get('/usuarios/:cpf', async (req, res) => {
    
    try{ 
        const { rows } = await pool.query(`SELECT * from usuarios where cpf='${req.params.cpf}'`)
        return res.status(200).send(rows[0])
    } catch(err) {
        return res.status(400).send(err)
    }
})


app.listen(PORT, () => console.log(`Servidor normal ${PORT}`))
