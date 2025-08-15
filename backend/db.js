require('dotenv').config({ path: __dirname + '/.env' });
const mysql = require('mysql2');

// Verifica que las variables se leen correctamente
console.log('Usuario:', process.env.DB_USER);
console.log('Contraseña:', process.env.DB_PASSWORD);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;