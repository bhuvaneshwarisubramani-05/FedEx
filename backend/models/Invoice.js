module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    invoiceId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    invoiceAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    daysOverdue: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    invoiceStatus: {
      type: DataTypes.ENUM('OPEN', 'PAID', 'OVERDUE', 'PARTIALLY_PAID', 'CANCELLED'),
      defaultValue: 'OPEN',
      allowNull: false
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
  }, {
    tableName: 'invoices',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  Invoice.associate = (models) => {
    Invoice.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
    Invoice.hasOne(models.RecoveryCase, {
      foreignKey: 'invoiceId',
      as: 'recoveryCase'
    });
  };

  return Invoice;
};
