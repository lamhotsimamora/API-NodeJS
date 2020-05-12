const path = require('path');
const express = require('express')
const app  = express()
const port = 8080
const conn = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) =>{
    const token = req.body.token 

    if (token==='kKKl3NKuXfb6kVg2pp3d'){
        conn.query('SELECT * FROM t_user', function (error, rows, fields){
            res.json(rows)
        })
    }else{
        res.json({
            message: 'Token Invalid'
        })
    }
})


app.listen(port, () => 
	console.log(`listening on port ${port}!`)
)