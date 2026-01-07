module.exports = (sequelize, DataTypes) => {
  const SOPStep = sequelize.define('SOPStep', {
    stepId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    sopId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    actionType: {
      type: DataTypes.ENUM('CALL', 'EMAIL', 'VISIT', 'LEGAL_NOTICE', 'FINAL_DEMAND', 'SMS', 'LETTER'),
      allowNull: false
    },
    dueInDays: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mandatory: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    stepOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    expectedOutcome: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'sop_steps',
    timestamps: true
  });

  SOPStep.associate = (models) => {
    SOPStep.belongsTo(models.SOPTemplate, {
      foreignKey: 'sopId',
      as: 'template'
    });

    SOPStep.hasMany(models.CaseAction, {
      foreignKey: 'stepId',
      as: 'actions'
    });
  };

  return SOPStep;
};
