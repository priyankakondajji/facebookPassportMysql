module.exports = {
   up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('user', {
       id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
       },
       email: {
          type: Sequelize.STRING(50),
           allowNull: false,
       },
       facebookid: {
          type: Sequelize.INTEGER,
       },
       createdAt: {
         allowNull: false,
         type: Sequelize.DATE
       },
       updatedAt: {
         allowNull: false,
         type: Sequelize.DATE
       }
     });
   },
   down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('user');
   }
 };