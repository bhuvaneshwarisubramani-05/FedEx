module.exports = (sequelize, DataTypes) => {
  const CaseAction = sequelize.define('CaseAction', {
    actionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    caseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'recovery_cases',
        key: 'caseId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    stepId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'sop_steps',
        key: 'stepId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    actionStatus: {
      type: DataTypes.ENUM('PENDING', 'COMPLETED', 'MISSED', 'IN_PROGRESS', 'CANCELLED'),
      defaultValue: 'PENDING',
      allowNull: false
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    completionNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Notes added by DCA when completing the action'
    },
    completedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'User or DCA agent who completed the action'
    },
    attemptCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Number of attempts made'
    }
  }, {
    tableName: 'case_actions',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
      {
        fields: ['caseId', 'actionStatus']
      },
      {
        fields: ['dueDate']
      }
    ]
  });

  CaseAction.associate = (models) => {
    CaseAction.belongsTo(models.RecoveryCase, {
      foreignKey: 'caseId',
      as: 'case'
    });
    CaseAction.belongsTo(models.SOPStep, {
      foreignKey: 'stepId',
      as: 'step'
    });
    CaseAction.hasMany(models.SOPBreach, {
      foreignKey: 'actionId',
      as: 'breaches'
    });
  };

  return CaseAction;
};