module.exports = (sequelize, DataTypes) => {
   const user = sequelize.define(
      'user',
      {
       id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          },
       email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          },
       facebookid: {
             type: DataTypes.INTEGER,
          },
      },
   {
      freezeTableName: true,
   }
   );
   return user;
 };