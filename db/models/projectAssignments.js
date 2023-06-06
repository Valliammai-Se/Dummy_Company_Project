'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projectAssignments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projectAssignments.init({
    project_id: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'projectAssignments',
  });
  return projectAssignments;
};