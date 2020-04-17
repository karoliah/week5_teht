'use strict';
const express = require('express');
const router = express.Router();
const {body, check} = require('express-validator');
const multer = require('multer');
const upload = multer({dest: './uploads/', fileFilter});
const catController = require('../controllers/catController');

function fileFilter(req, file, cb) {
  console.log('filefilter', file);


  if (!file.mimetype.includes('image')) {
    return cb(null, false, new Error('I don\'t have a clue!'));
  } else {
    cb(null, true);
  }
};

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/hack', (req, res) => {
  res.send(req.body.search);
});

router.post('/',
    upload.single('cat'),
    [
      body('name', 'name required').isLength({min: 1}),
      body('age', 'age in numbers required').isNumeric().isLength({min: 1}),
      body('weight', 'weight in numbers required').isNumeric().isLength({min: 1}),
      body('owner', 'owner in numbers required').isNumeric().isLength({min: 1}),
      check('cat').custom(catController.cat_file_validator), // cat_file_validator checks only req.file
    ], (req, res) => {
      console.log('tiedosto: ', req.file);
      catController.cat_post(req, res);
    });

router.put('/', [
  body('name', 'name required').isEmpty({min: 1}),
  body('age', 'age in numbers required').isNumeric().isLength({min: 1}),
  body('weight', 'weight in numbers required').isNumeric().isLength({min: 1}),
  body('owner', 'owner in numbers required').isNumeric().isLength({min: 1}),
], catController.cat_put);

router.delete('/:id', catController.cat_delete);

module.exports = router;