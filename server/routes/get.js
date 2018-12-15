let express = require('express');
let router = express.Router();

router.get('/:code', (req, res, next) => {
    let urlCode = req.params.code;

    req.app.get('mydb').collection('urls').find({urlCode: urlCode}).toArray((err, url) => {
        if (err)
            res.send(err);

        if (url.length > 0)
            res.json(url[0]['longURL']);
        else
            res.json("INVALID SHORT URL!");
    });
});

module.exports = router;
