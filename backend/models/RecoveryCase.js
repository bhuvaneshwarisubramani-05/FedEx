module.exports = (sequelize, DataTypes) => {
  const RecoveryCase = sequelize.define('RecoveryCase', {
    caseId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    invoiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'invoices',
        key: 'invoiceId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'customerId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    amountDue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    daysOverdue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    caseStatus: {
      type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'CLOSED'),
      defaultValue: 'OPEN',
      allowNull: false
    },
    createdBy: {
      type: DataTypes.ENUM('SYSTEM', 'USER'),
      defaultValue: 'SYSTEM',
      allowNull: false
    },
    riskLevel: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'),
      allowNull: true
    },
    riskScore: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    },
    closureRemarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    priority: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
      defaultValue: 'MEDIUM'
    }
  }, {
    tableName: 'recovery_cases',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  RecoveryCase.associate = (models) => {
    RecoveryCase.belongsTo(models.Invoice, {
      foreignKey: 'invoiceId',
      as: 'invoice'
    });
    RecoveryCase.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
    RecoveryCase.hasMany(models.CaseAssignment, {
      foreignKey: 'caseId',
      as: 'assignments'
    });
    RecoveryCase.hasMany(models.CaseAction, {
      foreignKey: 'caseId',
      as: 'actions'
    });
    RecoveryCase.hasMany(models.SOPBreach, {
      foreignKey: 'caseId',
      as: 'breaches'
    });
    RecoveryCase.hasMany(models.Escalation, {
      foreignKey: 'caseId',
      as: 'escalations'
    });
    RecoveryCase.hasOne(models.RecoveryOutcome, {
      foreignKey: 'caseId',
      as: 'outcome'
    });
  };

  return RecoveryCase;
};
