module.exports = (sequelize, DataTypes) => {
  const Escalation = sequelize.define('Escalation', {
    escalationId: {
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
    escalationReason: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Why was this case escalated'
    },
    escalatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    notifiedTo: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Email or user ID of person notified'
    },
    escalationLevel: {
      type: DataTypes.ENUM('MANAGER', 'LEGAL', 'EXECUTIVE', 'OPERATIONS'),
      defaultValue: 'MANAGER',
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'),
      defaultValue: 'OPEN',
      allowNull: false
    },
    resolvedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resolutionNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    resolvedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    priority: {
      type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT'),
      defaultValue: 'HIGH'
    }
  }, {
    tableName: 'escalations',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
      {
        fields: ['caseId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['escalationLevel']
      }
    ]
  });

  Escalation.associate = (models) => {
    Escalation.belongsTo(models.RecoveryCase, {
      foreignKey: 'caseId',
      as: 'case'
    });
  };

  return Escalation;
};
