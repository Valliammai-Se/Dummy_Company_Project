'use strict';
const {
  Model
} = require('sequelize');
const projects = require('./projects');
module.exports = (sequelize, DataTypes) => {
  class persons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.companies, {as: "company",foreignKey: "company_id"});
      this.belongsToMany(models.projects, { through: 'projectAssignments' });
    }
  }
  persons.init({
    company_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'persons',
  });
  return persons;
};