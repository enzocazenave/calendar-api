const express = require('express');

// CREA EL SERVIDOR DE EXPRESS
const app = express();

// RUTAS
app.get('/', (req, res) => {
    res.json({
        ok: true
    })
})

// ESCUCHAR
app.listen(3000, () => {
    console.log(`Server running on port ${ 4000 }`);
});

