const pet = require('../controllers/pet.controller.js');

module.exports = (app) => {
  app.get('/pets', pet.getAll);
  app.get('/pets/:id', pet.get);
};
