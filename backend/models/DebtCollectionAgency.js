module.exports = (sequelize, DataTypes) => {
  const DebtCollectionAgency = sequelize.define('DebtCollectionAgency', {
    dcaId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    dcaName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'e.g., REGIONAL, CORPORATE, SMALL_BUSINESS, INTERNATIONAL'
    },
    successRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0.00,
      validate: {
        min: 0,
        max: 100
      },
      comment: 'Percentage of successful recoveries'
    },
    sopComplianceScore: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0.00,
      validate: {
        min: 0,
        max: 100
      },
      comment: 'SOP adherence score'
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Geographic coverage area'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'debt_collection_agencies',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  DebtCollectionAgency.associate = (models) => {
    DebtCollectionAgency.hasMany(models.CaseAssignment, {
      foreignKey: 'dcaId',
      as: 'assignments'
    });
    DebtCollectionAgency.hasMany(models.SOPBreach, {
      foreignKey: 'dcaId',
      as: 'breaches'
    });
  };

  return DebtCollectionAgency;
};
