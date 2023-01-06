/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
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
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        fieldName: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        fieldName: 'updated_at'
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Questions');
  }
};