var express = require('express');
var router = express.Router();


// Methods
var read = function (req, res, next) {
    res.json({
        data: [
            {name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224'},
            {name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234'},
            {name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244'},
            {name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254'}
        ],
        success: true
    });
};



//Possible routes

router.post('/read', read);
router.get('/read', read);


router.post('/update', function (req, res, next) {
    res.json({operation: 'update', success: true});
});


router.post('/destroy', function (req, res, next) {
    res.json({operation: 'destroy', success: true});
});


router.post('/create', function (req, res, next) {
    res.json({operation: 'create', success: true});
});









module.exports = router;
