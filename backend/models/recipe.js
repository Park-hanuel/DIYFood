const Sequelize = require('sequelize');

module.exports = class Recipe extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    //   foodCode: { 
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //   },
      foodName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },     
      itemCode: { 
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      itemName: { 
        type: Sequelize.STRING(45), 
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Recipe',
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
    db.Recipe.belongsTo(db.RecipeNutrient, {foreignKey :'foodCode', targerKey:'foodCode'});
  }
};