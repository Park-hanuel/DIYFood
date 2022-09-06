const Sequelize = require('sequelize');

module.exports = class UserRecipe extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      foodCode : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date : {
        type : Sequelize.STRING(50),
        allowNull: false
      }
    },{
      sequelize,
      timestamps: false,
      modelName : 'UserRecipe',
      charset:'utf8',
      collate: 'utf8_general_ci'
    } );
}
  static associate(db) {
    db.UserRecipe.belongsTo(db.User, {foreignKey: "userId", targetKey: 'id'})
    db.UserRecipe.belongsTo(db.RecipeNutrient, {foreignKey: "foodCode", targetKey: 'foodCode'})
  }
};
