const express = require('express');
const router = express.Router();
const Photos = require('../db/models/Photos');

// get a list of all photos
router.get('/', (req, res) => {
  Photos.fetchAll()
    .then(data => {
      const dataObj = { photos: data.toJSON() };
      const photos = dataObj.photos;

      res.render('templates/index.hbs', {
        pageTitle: 'Photo Gallery',
        photos
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// show form field to create a new photo
router.get('/gallery/new', (req, res) => {
  res.render('templates/new.hbs', {
    pageTitle: 'Enter a new photo'
  })
  .catch(err=>{
      res.json(err);
  })
});

// show a form field to edit an existing photo
router.get('/gallery/:id/edit', (req, res) => {
  res.render('templates/edit.hbs',{
      pagetitle: 'Edit an photo'
  });
});

// get photo by photo_id
router.get('/gallery/:id', (req, res) => {
  const { id } = req.params;
  Photos.where({ photo_id: id })
    .fetchAll()
    .then(data => {
      const dataObj = { photos: data.toJSON() };
      const photos = dataObj.photos[0];

      res.render('templates/individualPhoto.hbs', {
        pageTitle: photos.description,
        link: photos.link,
        author: photos.author
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// create a new photo
router.post('/gallery', (req, res) => {
  const payload = {
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  };
  Photos.forge(payload)
    .save()
    .then(data => {
      res.redirect('/');
    })
    .catch(err => {
      res.json(err);
    });
});

// edit an existing photo
router.put('/gallery/:id', (req, res) => {
  const { id } = req.params;
  const payload = {
    author: req.body.author
  };
  Photos.where({ photo_id: id })
    .fetch()
    .then(data => {
      return data.save(payload);
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

// delete an exisiting photo
router.delete('/gallery/:id', (req, res) => {
  const { id } = req.params;

  Photos.where({ photo_id: id })
    .destroy()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
