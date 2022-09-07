const Sequelize = require('sequelize');

module.exports = class UserInfo extends Sequelize.Model {
  static init(sequelize){
    return super.init({
    // 성별
    gender : {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    // 나이
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    // 체중(kg)
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    // 신장(키 cm)
    height: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    // 0~2단계 목표 벌크업, 유지, 다이어트
    purpose: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    // 0~4 단계 활동량 거의 없다, 조금 있다, 보통, 꽤 있다, 매우 활동적
    activeMass: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    },{
      sequelize,
      timestamps: false,
      modelName : 'UserInfo',
      charset:'utf8',
      collate: 'utf8_general_ci'
    } );
}
  static associate(db) {
    db.UserInfo.belongsTo(db.User, {foreignKey: "userId", targetKey: 'id'})
    // db.UserInfo.belongsTo(db.UserRecipe, {foreignKey: "date", targetKey: 'userId'})
    //userid date
  }
};
