module.exports = (sequelize, DataTypes) => {
  const RecoveryOutcome = sequelize.define('RecoveryOutcome', {
    outcomeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    caseId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'recovery_cases',
        key: 'caseId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      comment: 'One outcome per case'
    },
    recoveredAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        min: 0
      },
      comment: 'Total amount recovered'
    },
    recoveryDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      },
      comment: 'Number of days taken to recover'
    },
    success: {
      type: DataTypes.ENUM('YES', 'NO', 'PARTIAL'),
      allowNull: false,
      comment: 'YES = full recovery, PARTIAL = some recovery, NO = no recovery'
    },
    closedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    closureNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Final notes on case closure'
    },
    recoveryPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: 'Percentage of original amount recovered'
    },
    closedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'User who closed the case'
    },
    finalStatus: {
      type: DataTypes.ENUM('FULLY_RECOVERED', 'PARTIALLY_RECOVERED', 'WRITTEN_OFF', 'LEGAL_ACTION', 'SETTLED'),
      allowNull: true
    }
  }, {
    tableName: 'recovery_outcomes',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  RecoveryOutcome.associate = (models) => {
    RecoveryOutcome.belongsTo(models.RecoveryCase, {
      foreignKey: 'caseId',
      as: 'case'
    });
  };

  return RecoveryOutcome;
};