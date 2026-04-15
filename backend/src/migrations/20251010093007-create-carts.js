'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid_generate_v4'), // Postgres extension, see notes
        allowNull: false,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      session_id: {
        type: Sequelize.STRING,
        allowNull: true
      },

      total_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },

      total_items: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      discount_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },

      tax_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },

      shipping_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },

      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USD'
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('carts', ['user_id'], { name: 'idx_carts_user_id' });
    await queryInterface.addIndex('carts', ['session_id'], { name: 'idx_carts_session_id' });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('carts', 'idx_carts_user_id').catch(() => {});
    await queryInterface.removeIndex('carts', 'idx_carts_session_id').catch(() => {});
    await queryInterface.dropTable('carts');
  }
};
