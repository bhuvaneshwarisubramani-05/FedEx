module.exports = (sequelize, DataTypes) => {
  const SOPTemplate = sequelize.define('SOPTemplate', {
    sopId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sopName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    applicableRiskLevel: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    escalationThreshold: {
      type: DataTypes.INTEGER
    },
    version: {
      type: DataTypes.STRING,
      defaultValue: '1.0'
    }
  }, {
    tableName: 'sop_templates',
    timestamps: true
  });

  SOPTemplate.associate = (models) => {
    SOPTemplate.hasMany(models.SOPStep, {
      foreignKey: 'sopId',
      as: 'steps',
      onDelete: 'CASCADE'
    });
  };

  return SOPTemplate;
};
