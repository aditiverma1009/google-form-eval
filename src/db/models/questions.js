import { Model } from 'sequelize';
import forms from './forms.js';

export default (sequelize, DataTypes) => {
  class Questions extends Model {
    static associate(models) {
      models.Questions.hasMany(models.Responses, {
        foreignKey: 'question_id'
      });
    }
  }
  Questions.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    form_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'forms',
        key: 'id',
      },
      unique: 'compositeIndexQues'
    },
    text: { type: DataTypes.STRING, allowNull: false, unique: 'compositeIndexQues' },
    type: { type: DataTypes.STRING, allowNull: false },
    is_required: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};