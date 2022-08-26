const Sequelize = require("sequelize");

module.exports = class ExistGrocery extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        itemCode: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        detailItemCode: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "ExistGrocery",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
  db.ExistGrocery.belongsTo(db.User, {foreignKey: "userId", targetKey: 'id'})
  }
};
