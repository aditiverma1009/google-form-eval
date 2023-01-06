import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Forms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Forms.hasMany(models.Questions, {
        foreignKey: 'form_id'
      });
    }
  }
  Forms.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Forms',
  });
  return Forms;
};