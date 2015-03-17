var express = require('express');
var router = express.Router();

//middleware to use for all the requests
router.use(function(req, res, next){
    //logging
    console.log("go next and in the middleware");
    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'To Be A Calconer' });
});

module.exports = router;
