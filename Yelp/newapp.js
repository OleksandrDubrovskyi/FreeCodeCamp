const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Campground = require('./db').Campground;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/campgrounds', (req, res, next) => {
    Campground.all((err, campgrounds) => {
        if (err) return next(err);
        res.send(campgrounds);
    });
});

app.get('/campgrounds/:id', (req, res, next) => {
    const id = req.params.id;
    Campground.find(id, (err, campground) => {
        if (err) return next(err);
        res.send(campground);
    });
});

app.delete('/campgrounds/:id', (req, res, next) => {
    const id = req.params.id;
    Campground.delete(id, (err) => {
        if (err) return next(err);
        res.send({ message: 'Deleted' });
    });
});

const read = require('node-readability');
const url = 'http://www.manning.com/cantelon2/';

read(url, (err, result) => {
    Campground.create(
        { title: result.name, content: result.image },
        (err, article) => {
            // Article saved to the database
        }
    );
});

app.post('/articles', (req, res, next) => {
    const url = req.body.url;
    read(url, (err, result) => {
        if (err || !result) res.status(500).send('Error downloading article');
        Article.create(
            { title: result.title, content: result.content },
            (err, article) => {
                if (err) return next(err);
                res.send('OK');
            }
        );
    });
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'));
});


module.exports = app;