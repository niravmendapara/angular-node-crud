var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    name: String,
    position: String,
    office: String,
    salary: Number
}, { collection: 'ang-node' });


var userName = mongoose.model('userName', userDataSchema);

var ObjectId = require('mongodb').ObjectId;
/* GET home page. */
router.get('/', function(req, res, next) {
    userName.find((err, doc) => {
        if (!err) { res.send(doc) } else {
            console.log("Errore having retrive get page");
        }
    });

});



router.post('/', function(req, res, next) {

    var result = new userName({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    result.save((err, doc) => {
        if (!err) {
            console.log("Data Inserted Sucessfully");
            res.send(doc);
        } else {
            console.log("Errore having retrive post page");
        }
    });
});

router.put('/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params._id)) {
        console.log("Error having retrive edit page");
    };
    var item = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    userName.findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: item }, (err, doc) => {
        if (!err) {
            console.log("Data Updated Sucessfully");
            res.send(doc);
        } else {
            console.log("Error having retrive update page");
        }
    });
});

router.delete('/:id', (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params._id)) {
        console.log("Error having retrive delete page");
    }

    userName.findOneAndRemove({ _id: ObjectId(req.params.id) }, (err, doc) => {
        if (!err) {
            console.log("Data deleted Sucessfully");
            res.send(doc);
        } else {
            console.log("Errore having retrive delete page");
        }
    });
});


module.exports = router;