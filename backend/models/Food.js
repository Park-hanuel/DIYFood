const Sequelize = require('sequelize');

module.exports = class Food extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      foodCode: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
      foodCategory: { 
        type: Sequelize.STRING(15),
        allowNull: false,
      }, 
      foodName: { 
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      manufacturer: { 
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      servingSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      foodEnergy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },     
     foodCarbohydrate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, 
     foodProtein: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },         
     foodFat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
     foodNatrium: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, 
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Food',
      tableName: 'Foods',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      index: [
        {
            name: 'foodName_index',
            fields: ['foodName'],
        },
      ],
    });
  }
  static associate(db) {
  }
};