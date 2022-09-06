const Sequelize = require('sequelize');

module.exports = class UserIngredient extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      itemCode : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      detailItemCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price : {
        type: Sequelize.STRING(50),
        allowNull: false
      },
    },{
      sequelize,
      timestamps: false,
      modelName : 'UserIngredient',
      charset:'utf8',
      collate: 'utf8_general_ci'
    } );
}
  static associate(db) {
    db.UserIngredient.belongsTo(db.User, {foreignKey: "userId", targetKey: 'id'})
  }
};
