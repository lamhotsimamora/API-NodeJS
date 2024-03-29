const path = require('path');
const express = require('express')
const app = express()
const port = 8081
const conn = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

const token_ori = 'kKKl3NKuXfb6kVg2pp3dcsyWEMjSU0cFbH4cw1xm2pEaJjCe41TP1Ltkfh61fVafm5Ds1Y3jydxMZAOC';

app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/data-users', (req, res) => {
    const token_user = req.body.token

    if (token_user === token_ori) {
        conn.query('SELECT * FROM t_user', function(error, rows, fields) {
            res.json(rows)
        })
    } else {
        res.json({
            message: 'Token Invalid'
        })
    }
})

app.post('/load-user-byid', (req, res) => {
    const token_user = req.body.token

    if (token_user === token_ori) {
        const id_user = req.body.id_user;
        conn.query(`select * from t_user where id_user=${id_user}`, function(error, rows, fields) {
            if (error) throw error;
            res.json(rows);
        })
    } else {
        res.json({
            message: 'Token Invalid'
        })
    }
})

app.post('/add-data', (req, res) => {
    const token_user = req.body.token

    if (token_user === token_ori) {

        const username = req.body.username;
        const email = req.body.email;
        const age = req.body.age;

        if (username == null || username === '') {
            res.json({
                message: 'Username is empty'
            })
        } else if (email == null || email === '') {
            res.json({
                message: 'Email is empty'
            })
        } else if (age == null || age === '') {
            res.json({
                message: 'Age is empty'
            })
        } else {
            const q = 'insert into t_user (username_,email_,age) values (' +
                conn.escape(username) + ',' +
                conn.escape(email) + ',' + conn.escape(age) + ')'

            conn.query(q, function(error, rows, fields) {
                if (error) throw error;
                res.json({
                    message: 'Success Add Data'
                })
            })
        }
    } else {
        res.json({
            message: 'Token Invalid'
        })
    }
})

app.post('/update-data', (req, res) => {
    const token_user = req.body.token

    if (token_user === token_ori) {

        const username = req.body.username;
        const email = req.body.email;
        const age = req.body.age;
        const id_user = req.body.id_user;

        if (id_user == null || id_user === '') {
            res.json({
                message: 'ID User is empty'
            })
        } else if (username == null || username === '') {
            res.json({
                message: 'Username is empty'
            })
        } else if (email == null || email === '') {
            res.json({
                message: 'Email is empty'
            })
        } else if (age == null || age === '') {
            res.json({
                message: 'Age is empty'
            })
        } else {
            conn.query('update t_user set username_=' +
                conn.escape(username) + ',email_=' +
                conn.escape(email) + ',age=' + conn.escape(age) + ' where id_user=' +
                conn.escape(id_user) + '',
                function(error, rows, fields) {
                    if (error) throw error;
                    res.json({
                        message: 'Success Update Data'
                    })
                })
        }
    } else {
        res.json({
            message: 'Token Invalid'
        })
    }
})


app.post('/delete-data', (req, res) => {
    const token_user = req.body.token

    if (token_user === token_ori) {

        const id_user = req.body.id_user;

        if (id_user == null || id_user === '') {
            res.json({
                message: 'ID User is empty'
            })
        } else {
            conn.query('delete from t_user where id_user=' + conn.escape(id_user) + '', function(error, rows, fields) {
                if (error) throw error;
                res.json({
                    message: 'Success Delete Data'
                })
            })
        }
    } else {
        res.json({
            message: 'Token Invalid'
        })
    }
})

app.listen(port, () =>
    console.log(`listening on port ${port}!`)
)