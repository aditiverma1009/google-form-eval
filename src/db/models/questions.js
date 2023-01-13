import { Model } from 'sequelize';
import forms from './forms.js';

export default (sequelize, DataTypes) => {
  class Questions extends Model {
    static associate(models) {
      Questions.belongsTo(models.Forms, {
        foreignKey: 'form_id',
        targetKey: 'id',
      });
      Questions.hasMany(models.Responses, {
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
    },
    text: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM,
      values: ['DATE', 'SHORTANS', 'LONGANS', 'NUMBER'],
      allowNull: false
    },
    is_required: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};