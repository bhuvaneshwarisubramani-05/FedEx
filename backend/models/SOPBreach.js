module.exports = (sequelize, DataTypes) => {
  const SOPBreach = sequelize.define('SOPBreach', {
    breachId: {
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
    actionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'case_actions',
        key: 'actionId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    dcaId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'debt_collection_agencies',
        key: 'dcaId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    breachReason: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Detailed reason for the breach'
    },
    breachedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    severity: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'),
      defaultValue: 'MEDIUM',
      allowNull: false
    },
    daysDelayed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Number of days past due date'
    },
    acknowledged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    acknowledgedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    acknowledgedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'sop_breaches',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
      {
        fields: ['caseId']
      },
      {
        fields: ['dcaId']
      },
      {
        fields: ['severity']
      }
    ]
  });

  SOPBreach.associate = (models) => {
    SOPBreach.belongsTo(models.RecoveryCase, {
      foreignKey: 'caseId',
      as: 'case'
    });
    SOPBreach.belongsTo(models.CaseAction, {
      foreignKey: 'actionId',
      as: 'action'
    });
    SOPBreach.belongsTo(models.DebtCollectionAgency, {
      foreignKey: 'dcaId',
      as: 'dca'
    });
  };

  return SOPBreach;
};
