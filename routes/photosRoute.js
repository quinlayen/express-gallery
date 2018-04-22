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
 
});


// show a form field to edit an existing photo
router.get('/gallery/:id/edit', (req, res) => {
  const {id} = req.params;
  res.render('templates/edit.hbs',{
      pageTitle: 'Edit this photo',
      id
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
  
  // edit an existing photo
router.put('/gallery/:id', (req, res) => {
  const { id } = req.params;
  let payload = {};
  for (key in req.body){
    //console.log('req.body[key]', req.body[key]);
      if(req.body[key]){
      payload.key = req.body;

    }
  }
  //console.log('query', query);

  console.log('this is a put', payload);
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
  console.log('this is a post', payload);
  Photos.forge(payload)
    .save()
    .then(data => {
      res.redirect('/');
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
