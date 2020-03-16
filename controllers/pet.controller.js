const Pet = require('../models/pet.model.js');
const Owner = require('../models/owner.model.js');

const getAll = async (req, res) => {
  const pets = await Pet.findAll();
  res.json({ pets: pets });
};

const get = async (req, res) => {
  // const pet = await Pet.findByPk(parseInt(req.params.id));
  const pet = await Pet.findOne({
    where: { id: 1 },
    include: [{ model: Owner }]
  });

  const owner = await Owner.findOne({
    where: { id: 1 },
    include: [{ model: Pet }]
  });

  res.json({ pet: pet, owner: owner });
};

module.exports = {
  getAll,
  get
};
