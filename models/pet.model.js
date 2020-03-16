const Sequelize = require('sequelize');

class Pet extends Sequelize.Model {}

const run = async () => {
  try {
    const sequelize = new Sequelize(
      'postgres://postgres:@localhost:5432/learning-postgres'
    );

    // Schema
    Pet.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        species: {
          type: Sequelize.STRING,
          allowNull: true
        },
        age: {
          type: Sequelize.INTEGER
        }
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'pet'
      }
    );

    await sequelize.authenticate();
    console.log('Connect to db successfully.');

    await Pet.sync({ force: true });
  } catch (err) {
    console.log('Could not connect to the database. Error: ', err);
  }
};

run();

module.exports = Pet;
