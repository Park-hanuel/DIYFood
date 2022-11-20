const Sequelize = require("sequelize");

module.exports = class ExistIngredient extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        itemCode: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "ExistIngredient",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
  db.ExistIngredient.belongsTo(db.User, {foreignKey: "userId", targetKey: 'id'})
  }
};
