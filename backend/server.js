const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const especiesRoutes = require('./routes/especies');
app.use('/api', especiesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});