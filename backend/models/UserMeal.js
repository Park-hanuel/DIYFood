const Sequelize = require("sequelize");

module.exports = class UserMeal extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        foodCode: {
          type : Sequelize.STRING(30),
          allowNull: false,
        },
        date : {
          type : Sequelize.STRING(50),
          allowNull: false
        },
        // 아침 : 0 / 점심 : 1 / 저녁 : 2 / 간식 : 3
        mealTime: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        servingSize: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        // Recipe : 0 / Food : 1
        selectCode: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "UserMeal",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
  db.UserMeal.belongsTo(db.User, {foreignKey: "userId", targetKey: 'id'})
  }
};