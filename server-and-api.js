
var cors = require('cors')
// call the packages we need
var express = require('express');
var app = express();
var app2 = express();
var fs = require('fs');
var Promise = require('promise');
var mysql = require("mysql");
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));

function allowCrossDomain(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
}

/*
 * Create the database connection
 */
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "иддш",
    database: "phones"
});

/*
 * Connect to the database
 */
function connect() {
    con.connect(function(err) {
        if(err) {
            console.log('Error connecting to databse');
            return;
        }
        console.log('Connection successful');
    });
}


/* 
 * Insert into phones
 */
/*var sql = "INSERT INTO phones (Label, Model) VALUES ('Company Inc', 'Highway 37')";
con.query(sql, function (err, result) {
    if(err) {
        throw err;
    }
    console.log("Insertion successful!\n");
});*/

/*
 * End connection
 */

 function disconnect() {
    con.end(function(err) {
        // The connection is terminated gracefully
        // Ensures all previously enqueued queries are still
        // before sending a COM_QUIT packet to the MySQL server.
    });
 }


var port = process.env.PORT || 1234;
var router = express.Router();

/*
 * Gets an employee by id
 */ 
router.get('/label/:id', function (req, res) {
    allowCrossDomain(res);

    connect();
    con.query('SELECT * FROM phoneLabel WHERE phoneLabel.id = ' + req.params.id, function(err, rows) {
        if(err) {
           res.json(err);
        } else {
            res.json(rows);
            
        }
        console.log('Data received from database:\n');
        console.log(rows);
        
    });
   // disconnect();
});

router.get('/labels', function (req, res) {
    allowCrossDomain(res);

    connect();
    con.query('SELECT * FROM phoneLabel', function(err, rows) {
        if(err) {
           res.json(err);
        } else {
            res.json(rows);
            
        }
        console.log('Data received from database:\n');
        console.log(rows);
        
    });
   // disconnect();
});

router.get('/label/model/:id', function(req, res) {
    allowCrossDomain(res);


    connect();
    con.query('SELECT * FROM phoneLabel INNER JOIN phoneModel ON phoneModel.labelId = phoneLabel.id WHERE phoneLabel.id =' + req.params.id, function(err, rows) {
        if(err) {
           res.json(err);
        } else {
            res.json(rows);
            
        }
        console.log('Data received from database:\n');
        console.log(rows);
        
    });
});

router.get('/label/model/:id1/details/:id2', function(req, res) {
    allowCrossDomain(res);

    console.log(req.params);
    connect();
    con.query('SELECT * FROM `phoneLabel` INNER JOIN `phoneModel.labelId` = `phoneLabel.id` INNER JOIN `phoneDetails` ON `phoneDetails.modelId` = `phoneModel.id` WHERE `phoneLabel.id` =`' + req.params.id1 + '`AND `phoneModel.id` = `' + req.params.id2 + '`', function(err, rows) {
        if(err) {
           res.json(err);
        } else {
            res.json(rows);
            
        }
        console.log('Data received from database:\n');
        console.log(rows);
        
    });
});

router.get('/label/filter?', function(req, res) {
    allowCrossDomain(res);

    connect(); 
    if(req.params.id) {
        con.query('SELECT * FROM phoneDetails INNER JOIN phoneModel ON phoneModel.id = phoneDetails.modelId INNER JOIN phoneLabel ON phoneLabel.id = phoneModel.labelId WHERE phoneDetails.id '+ req.params.id, function(err, rows) {
        if(err) {
           res.json(err);
        } else {
            res.json(rows);
            
        }
        console.log('Data received from database:\n');
        console.log(rows);
        
        });
    } else if(req.params.lab){
        con.query('SELECT * FROM `phoneDetails` INNER JOIN `phoneModel` ON `phoneModel.id` = `phoneDetails.modelId` INNER JOIN `phoneLabel` ON `phoneLabel.id` = `phoneModel.labelId` WHERE `phoneDetails.nameLabel`', function(err, rows) {
            if(err) {
                res.json(err);
            } else {
             res.json(rows);            
            }   
            console.log('Data received from database:\n');
            console.log(rows);
        }); 
    }
});



router.put('/add', function (req, res) {
     allowCrossDomain(res);

    connect();
    con.query('SELECT * FROM phoneLabel', function(err, rows) {
        if(err) {
           res.json(err);
        } else {
            res.json(rows);
            
        }
        console.log('Data received from database:\n');
        console.log(rows);
        
    });
    console.log(req.body);
    res.json(body);

   // disconnect();
});

router.delete('/label/model/:id', function (req, res) {
     allowCrossDomain(res);7
    var container;
    con.query('SELECT * FROM phoneModel WHERE phoneModel.id = ' + req.params.id, function(err, rows) {
        container = rows;
    })
    connect();
    con.query('DELETE FROM phoneModel WHERE phoneModel.id = ' + req.params.id, function(err, rows) {
        if(err) {
           res.json(err);
        } else {

            res.json(container);
            
        }
        
        console.log('Data received from database:\n');
        console.log(rows);
        
    });
   
   // disconnect();
});


 
app.use('/', router);
app.listen(port);