require('dotenv').config();
const app = require('./app');
const db = require('./models'); 
const logger = require('./utils/logger');

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await db.sequelize.authenticate();
    logger.info('Database connected');
    
 
    logger.info('Database connection verified');
    
    app.listen(port, () => logger.info(`Server started on port ${port}`));
  } catch (err) {
    logger.error('Unable to start server', err);
    process.exit(1);
  }
};

start();