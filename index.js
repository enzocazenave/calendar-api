const express = require('express');
require('dotenv').config();

// CREA EL SERVIDOR DE EXPRESS
const app = express();

// DIRECTORIO PUBLICO
app.use(express.static('public'));

// ESCUCHAR
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});

