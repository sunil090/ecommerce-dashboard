'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1️⃣ Rename brandid → brand_id (if it exists)
    const [brandCol] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products' AND column_name = 'brandid';
    `);
    if (brandCol.length > 0) {
      console.log('Renaming column brandid → brand_id');
      await queryInterface.renameColumn('products', 'brandid', 'brand_id');
    }

    // 2️⃣ Rename categoryid → category_id (if it exists)
    const [categoryCol] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products' AND column_name = 'categoryid';
    `);
    if (categoryCol.length > 0) {
      console.log('Renaming column categoryid → category_id');
      await queryInterface.renameColumn('products', 'categoryid', 'category_id');
    }

    // 3️⃣ Add brand_id column if missing
    const [brandIdCol] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products' AND column_name = 'brand_id';
    `);
    if (brandIdCol.length === 0) {
      console.log('Adding missing column brand_id');
      await queryInterface.addColumn('products', 'brand_id', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'brands',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
    }

    // 4️⃣ Add category_id column if missing
    const [categoryIdCol] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products' AND column_name = 'category_id';
    `);
    if (categoryIdCol.length === 0) {
      console.log('Adding missing column category_id');
      await queryInterface.addColumn('products', 'category_id', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
    }

   

    // 6️⃣ Add foreign key constraint for category_id (only if not exists)
    const [categoryConstraint] = await queryInterface.sequelize.query(`
      SELECT constraint_name 
      FROM information_schema.table_constraints 
      WHERE table_name = 'products' AND constraint_name = 'fk_products_category';
    `);
    if (categoryConstraint.length === 0) {
      console.log('Adding foreign key fk_products_category');
      await queryInterface.addConstraint('products', {
        fields: ['category_id'],
        type: 'foreign key',
        name: 'fk_products_category',
        references: {
          table: 'categories',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      });
    }

    console.log('✅ Migration completed successfully');
  },

  down: async (queryInterface) => {
    console.log('Reverting migration: rename-brand-and-category-columns');

    // Drop constraints if they exist
    await queryInterface.sequelize.query(`
      ALTER TABLE products DROP CONSTRAINT IF EXISTS fk_products_brand;
      ALTER TABLE products DROP CONSTRAINT IF EXISTS fk_products_category;
    `);

    // Rename columns back (if they exist)
    const [brandIdCol] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products' AND column_name = 'brand_id';
    `);
    if (brandIdCol.length > 0) {
      await queryInterface.renameColumn('products', 'brand_id', 'brandid');
    }

    const [categoryIdCol] = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products' AND column_name = 'category_id';
    `);
    if (categoryIdCol.length > 0) {
      await queryInterface.renameColumn('products', 'category_id', 'categoryid');
    }

    console.log('✅ Migration reverted successfully');
  },
};
