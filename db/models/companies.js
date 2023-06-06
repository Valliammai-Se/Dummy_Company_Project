'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.persons, {foreignKey: "company_id"});
    }
  }
  companies.init({
    company_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    noOfEmployees: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'companies',
  });
  return companies;
};