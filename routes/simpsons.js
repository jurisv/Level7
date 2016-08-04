var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('meridian.db');

// Methods
var read = function (req, res, next) {
    //IMPORTANT: complex params are not JSON, they are strings, so remember to parse them
    var sortObject = req.body.sort ? JSON.parse(req.body.sort) : null,
        filterObject = req.body.filter ? JSON.parse(req.body.filter) : null,
        filter,
        query;

    // this example sorts by one column
    var sortColumn = sortObject ? sortObject[0].property : 'name',
        sortDirection = sortObject ? sortObject[0].direction : 'DESC';

    //Build filter
    filter = filterObject ? 'WHERE ' + filterObject[0].property + ' like "%' + filterObject[0].value + '%" ' : '';

    //Build query
    query = 'SELECT * FROM simpsons ' + filter + 'ORDER BY ' + sortColumn + ' ' + sortDirection;

    //console.log(query); // For testing

    db.all(query, function (err, row) {
        if (err !== null) {
            // Express handles errors via its next function.
            // It will call the next operation layer (middleware),
            // which is by default one that handles errors.
            next(err);
        }
        else {
            res.json({
                data: row,
                success: true
            });
        }
    });
};

var create = function (req, res, next) {
    var data = req.body,
        query = 'INSERT INTO simpsons(name,email,phone) VALUES(?,?,?)';

    db.run(query, [data.name, data.email, data.phone], function (err) {
        if (err !== null) {
            next(err);
        } else {
            // we have to return newly inserted record to be consumed on client side
            db.all('SELECT * FROM simpsons WHERE id=' + this.lastID, function (err, row) {
                if (err !== null) {
                    next(err);
                }
                else {
                    res.json({
                        data: row,
                        success: true
                    });
                }
            });
        }
    });
};

var update = function (req, res, next) {
    var data = req.body,
        query = 'UPDATE simpsons SET name=?, email=?, phone=? WHERE id=?';

    //console.log(query, data);

    db.run(query, [data.name, data.email, data.phone, data.id], function (err) {
        if (err !== null) {
            next(err);
        } else {
            // we have to return newly inserted record to be consumed on client side
            db.all('SELECT * FROM simpsons WHERE id=' + data.id, function (err, row) {
                if (err !== null) {
                    next(err);
                }
                else {
                    res.json({
                        data: row,
                        success: true
                    });
                }
            });
        }
    });
};

var destroy = function (req, res, next) {
    var data = req.body,
        id = data.id,
        query = 'DELETE FROM simpsons WHERE id=?';

    db.run(query, [id], function (err) {
        if (err !== null) {
            next(err);
        } else {
            // we return deleted record id and status
            res.json({
                id: id,
                success: true
            });
        }
    });
};

//Possible routes
//(We set up both GET and POST here for simpler testing)
router.post('/read', read);
router.get('/read', read);

router.post('/create', create);

router.post('/update', update);

router.post('/destroy', destroy);

//Crate table
router.get('/init', function (req, res, next) {

    // Database table initialization
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='simpsons'",
        function (err, rows) {
            if (err !== null) {
                next(err);
            } else if (rows === undefined) {
                db.run('CREATE TABLE "simpsons" ' +
                    '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                    '"name" VARCHAR(255), ' +
                    '"email" VARCHAR(255), ' +
                    'phone VARCHAR(255))', function (err) {
                    if (err !== null) {
                        next(err);
                    } else {
                        res.json({operation: 'init', success: true, message: 'SQL Table ~simpsons~ initialized.'});
                    }
                });
            } else {
                res.json({operation: 'init', success: false, message: 'SQL Table ~simpsons~ already initialized.'});
            }
        }
    );
});

module.exports = router;
