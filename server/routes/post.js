let express = require('express');
let validURL = require("valid-url");
let shortid = require("shortid");
let router = express.Router();

router.post('/', (req, res, next) => {
    let longURL = req.body.longURL;
    let tinyBaseURL = req.body.tinyBaseURL;

    if (!validURL.isUri(tinyBaseURL)) {
        res.json("Invalid Base URL");
    }

    let urlCode = shortid.generate().substring(0, 6);

    if (validURL.isUri(longURL)) {
        req.app.get('mydb').collection('urls').find({longURL: longURL}).toArray((err, url) => {
            if (err)
                res.send(err);

            if (url.length > 0) {
                res.json(url[0]['tinyURL']);
            } else {
                let tinyURL = tinyBaseURL + "/" + urlCode;

                req.app.get('mydb').collection('urls').insertOne({
                    longURL: longURL,
                    tinyURL: tinyURL,
                    urlCode: urlCode
                }, (err, url) => {
                    if (err)
                        res.send(err);

                    res.json(tinyURL);
                });
            }
        });
    } else {
        res.json("INVALID ORIGINAL URL!");
    }
});

module.exports = router;
