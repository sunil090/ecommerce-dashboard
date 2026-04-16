// migrations/xxxxxx-create-products-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      sku: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'draft'),
        defaultValue: 'active',
      },
      brandId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
        model: 'brands'  // Ensure this is the correct table name for the Brand model
          key: 'id',        // Foreign key references the 'id' column in the Brands table
        },
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
         model: 'categories'  // Ensure this is the correct table name for the Category model
          key: 'id',            // Foreign key references the 'id' column in the Categories table
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
