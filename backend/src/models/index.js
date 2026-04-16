'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV=production';
const config = require('../config/config.js')[env];

// Initialize sequelize with the provided config
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Initialize the db object
const db = {};

// Dynamically load all model files from the current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      !file.includes('.test.js')
    );
  })
  .forEach((file) => {
    try {
      const modelPath = path.join(__dirname, file);
      const modelModule = require(modelPath);
      
      console.log(`🔍 Loading model: ${file}`);
      console.log(`🔍 Model module type:`, typeof modelModule);
      
      let model;
      
      // Check if the module exports a function (Sequelize model definition)
      if (typeof modelModule === 'function') {
        model = modelModule(sequelize, Sequelize.DataTypes);
        console.log(`✅ Model loaded as function: ${file} -> ${model.name}`);
      } 
      // Check if the module already has a defined model
      else if (modelModule && modelModule.name) {
        model = modelModule;
        console.log(`✅ Model loaded directly: ${file} -> ${model.name}`);
      }
      // Handle cases where the model might be exported differently
      else {
        console.warn(`⚠️  Skipping ${file}: Unknown export format`, modelModule);
        return;
      }
      
      db[model.name] = model;
      
    } catch (error) {
      console.error(`❌ Error loading model ${file}:`, error.message);
    }
  });

// Set up associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach sequelize instance and Sequelize constructor to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('📊 Final loaded models:', Object.keys(db));

module.exports = db;
