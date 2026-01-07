module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customerId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyType: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'e.g., SME, Corporate, Enterprise'
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    creditLimit: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Geographic region: North, South, East, West'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'customers',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Invoice, {
      foreignKey: 'customerId',
      as: 'invoices'
    });
    Customer.hasMany(models.RecoveryCase, {
      foreignKey: 'customerId',
      as: 'cases'
    });
  };

  return Customer;
};