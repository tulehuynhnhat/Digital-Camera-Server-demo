const express = require('express');
const cameraController = require('../controllers/cameraController');
const router = express.Router();

router
  .route('/')
  .get(cameraController.getAllCameras)
  .post(cameraController.createCamera)
  .delete(cameraController.deleteAllCameras);

router
  .route('/:id')
  .get(cameraController.getCamera)
  .put(cameraController.updateCamera)
  .delete(cameraController.deleteCamera);

module.exports = router;
