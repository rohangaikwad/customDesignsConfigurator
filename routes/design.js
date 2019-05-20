var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

/* GET users listing. */
router.post('/save', function (req, res, next) {
    //console.log(req.body.img);

    var name = "design" + new Date().getTime() + ".jpg";

    var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
    base64Data = req.body.img.replace(/^data:image\/jpeg;base64,/, "");
    fs.writeFile("designs/" + name, base64Data, 'base64', function (err) {
        if(err) {
            res.json({
                status: false
            })
        }
        res.json({
            status: true,
            name: name
        });
    });
});


router.get('/view/:name', function (req, res, next) {
    let filePath = path.join(__dirname, '../designs', req.params.name);
    res.sendFile(filePath);
});

router.get('/download/:name', function (req, res, next) {
    //res.sendFile("designs/rohanout.jpg");
    let filePath = path.join(__dirname, '../designs', req.params.name);
    //res.sendFile(filePath);
    res.download(filePath, req.params.name, function (err) {
        if (err) {
            res.send('File doesn\'t exist')
            // Handle error, but keep in mind the response may be partially-sent
            // so check res.headersSent
        } else {
            // decrement a download credit, etc.
        }
    });
});

module.exports = router;
