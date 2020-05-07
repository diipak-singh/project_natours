const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

//router.param('id', tourController.checkID);

// Create a chechBody Middleware,
// check if a body contains name and price property,
// if not send back 404 (bad request).
// now creating it and using it in middleware

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour);

module.exports = router;
