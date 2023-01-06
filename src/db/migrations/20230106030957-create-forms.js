/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Forms');
  }
};