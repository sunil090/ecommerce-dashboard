// Migration for adding brandId to products table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'brandId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'brands',  // Reference to the 'brands' table
        key: 'id',        // Foreign key references the 'id' column in Brands table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // You can change this to 'CASCADE' if you want to delete products when the brand is deleted
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'brandId');
  },
};
