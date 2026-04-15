// Migration to add categoryId to products table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'categoryId', {
      type: Sequelize.UUID,
      allowNull: false,  // Adjust based on whether this column should allow null values
      references: {
        model: 'categories',  // Reference to the 'categories' table
        key: 'id',            // Foreign key reference to 'id' column in Categories table
      },
      onUpdate: 'CASCADE',  // Ensure referential integrity is maintained if 'categoryId' changes in Categories table
      onDelete: 'SET NULL', // When a category is deleted, the product's categoryId will be set to NULL (optional, can be 'CASCADE' or 'RESTRICT')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'categoryId');
  },
};
