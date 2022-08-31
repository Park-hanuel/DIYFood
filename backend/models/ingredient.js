const Sequelize = require("sequelize");

module.exports = class Ingredient extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        itemCode: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        itemName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Ingredient",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
  }
};
