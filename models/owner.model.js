const Sequelize = require('sequelize');
const Pet = require('./pet.model.js');

class Owner extends Sequelize.Model {}

const run = async () => {
  try {
    const sequelize = new Sequelize(
      'postgres://postgres:@localhost:5432/learning-postgres'
    );

    // Schema Owner
    Owner.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true
        }
      },
      {
        sequelize: sequelize,
        timestamps: true,
        modelName: 'owner'
      }
    );

    await sequelize.authenticate();
    console.log('Connect to db successfully.');

    Pet.belongsTo(Owner);
    Owner.hasMany(Pet);

    await Owner.sync({ force: true });

    const owner = await Owner.create({
      name: 'Bruce Wayne',
      email: 'bruce@wayne.com'
    });

    // Add data
    const batman = await Pet.create({
      name: 'Batman',
      species: 'bat',
      age: 17
    });

    batman.setOwner(owner);
  } catch (err) {
    console.log('Could not connect to the database. Error: ', err);
  }
};

run();

module.exports = Owner;
