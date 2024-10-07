import { Sequelize } from 'sequelize';

// Connexion à la base de données MySQL
const sequelize = new Sequelize('task_manager', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
};

export { sequelize, connectDB };
