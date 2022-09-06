const Sequelize = require('sequelize');

module.exports = class IiveIngredient extends Sequelize.Model {
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
      itemName : {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      detailItemName : {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      rank : {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      unit : {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      price : {
        type: Sequelize.STRING(50),
        allowNull: false
      },
    },{
      sequelize,
      timestamps: false,
      modelName : 'LiveIngredient',
      charset:'utf8',
      collate: 'utf8_general_ci'
    } );
}
  static associate(db) {}
};
