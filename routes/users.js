var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* ADD meeting to DB */
router.post('/addmeeting', function(req, res){
	var db = req.db;
	var collection = db.get('meetings');
	collection.insert(req.body, function(err, result){
		res.send((err == null) ? {msg : ''} : {msg: err});
	});
});

/* GET meeting from DB */
router.get('/getmeeting/:id', function(req, res){
	console.log('hit router function');
	var db = req.db;
	var collection = db.get('meetings');
	var meetingToRetrieve = req.params.id;
	collection.findOne({'_id' :  new ObjectId(meetingToRetrieve)}, function(e, doc){
		console.log('did we attempt to retrieve');
		res.json(doc);
	});
});

/* ADD meeting to DB */
router.post('/addmeeting', function(req, res){
	var db = req.db;
	var collection = db.get('meetings');
	collection.insert(req.body, function(err, result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);
	});
});

module.exports = router;
