import { Model } from 'sequelize';
import forms from './forms.js';
import questions from './questions.js';

export default (sequelize, DataTypes) => {
  class Responses extends Model {
  }
  Responses.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    form_id: {
      type: DataTypes.INTEGER,
      references: {
        model: forms,
        key: 'id',
      }
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: questions,
        key: 'id',
      }
    },
    response: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Responses',
  });
  return Responses;
};