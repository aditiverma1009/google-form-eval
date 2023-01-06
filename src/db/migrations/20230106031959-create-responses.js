/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Responses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      form_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Forms',
          },
          key: 'id'
        },
        allowNull: false
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Questions',
          },
          key: 'id'
        },
      },
      response: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        fieldName: 'create_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        fieldName: 'updated_at'
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Responses');
  }
};