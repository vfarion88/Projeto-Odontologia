var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.get('/teste', function (req, res) {
    return res.send({ error: true, message: 'teste' })
});


// connection configurations
var dbConn = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'gWefRqLf1V',
    password: 'U3h8MZiO6L',
    database: 'gWefRqLf1V'
});

// connect to database
dbConn.connect();



// Retrieve all users
app.get('/exames', function (req, res) {
    dbConn.query('SELECT * FROM EXAMES', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'EXAMES list.' });
    });
});


// Retrieve user with id
app.get('/exame/:id', function (req, res) {

    var exame_id = req.params.id;

    if (!exame_id) {
        return res.status(400).send({ error: true, message: 'Please provide exame_id' });
    }

    dbConn.query('SELECT * FROM EXAMES where id=?', exame_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'exames list.' });
    });

});


// Add a new user
app.post('/exames', function (req, res) {

    var exame = req.body.exame;

    if (!exame) {
        return res.status(400).send({ error:true, message: 'Please provide exame' });
    }

    dbConn.query('INSERT INTO EXAMES SET ? ', [exame] , function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});


//  Update user with id
app.put('/exame/:id', function (req, res) {

    var exame_id = req.params.id;
    var exame = req.body.exame;

    if (!exame_id || !exame) {
        return res.status(400).send({ error: exame, message: 'Please provide exame and exame_id' });
    }

    dbConn.query("UPDATE EXAMES SET  ? WHERE id = ?", [exame, exame_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'exame has been updated successfully.' });
    });
});


//  Delete user
app.delete('/exame/:id', function (req, res) {

    var exame_id = req.params.id;

    if (!exame_id) {
        return res.status(400).send({ error: true, message: 'Please provide exame_id' });
    }
    dbConn.query('DELETE FROM EXAMES WHERE id = ?', exame_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Exames has been updated successfully.' });
    });
});

// set port
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});

module.exports = app;