module.exports = (sequelize, DataTypes) => {
  const CaseAssignment = sequelize.define('CaseAssignment', {
    assignmentId: {
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
    assignedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    assignedBy: {
      type: DataTypes.ENUM('SYSTEM', 'USER'),
      defaultValue: 'SYSTEM',
      allowNull: false,
      comment: 'SYSTEM = ML assigned, USER = Manual assignment'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      comment: 'Only one assignment can be active per case'
    },
    unassignedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    assignmentNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'case_assignments',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
      {
        fields: ['caseId', 'isActive']
      }
    ]
  });

  CaseAssignment.associate = (models) => {
    CaseAssignment.belongsTo(models.RecoveryCase, {
      foreignKey: 'caseId',
      as: 'case'
    });
    CaseAssignment.belongsTo(models.DebtCollectionAgency, {
      foreignKey: 'dcaId',
      as: 'dca'
    });
  };

  return CaseAssignment;
};