const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zomber.Z00Z",
    database: "TEST"
});


app.get('/colaborador', (req, res) => {
    const sql = 'SELECT * FROM COLABORADOR';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

/*app.post('/create', (req, res) => {
    const { NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL } = req.body;

    if (!NOMBRE || !APELLIDO || EDAD <= 0) {
        return res.status(400).json({ message: 'Datos inválidos' });
    }

    const sql = 'INSERT INTO COLABORADOR SET ?';
    const data = { NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL };
    db.query(sql, data, err => {
        if (err) throw err;
        res.json({ message: 'Colaborador agregado' });
    });
});*/

app.post('/colaborador', (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const direccion = req.body.direccion;
    const edad = req.body.edad;
    const profesion = req.body.profesion;
    const estadoCivil = req.body.estadoCivil;

    db.query('INSERT INTO COLABORADOR (NOMBRE, APELLIDO, DIRECCION, EDAD, PROFESION, ESTADOCIVIL) VALUES (?,?,?,?,?,?)',
        [nombre, apellido, direccion, edad, profesion, estadoCivil],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al agregar colaborador");
            } else {
                res.send(result);
            }
        }
    );
});


// Ruta PUT para actualizar un colaborador
app.put('/colaborador', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const direccion = req.body.direccion;
    const edad = req.body.edad;
    const profesion = req.body.profesion;
    const estadoCivil = req.body.estadoCivil;

    db.query('UPDATE COLABORADOR SET NOMBRE=?, APELLIDO=?, DIRECCION=?, EDAD=?, PROFESION=?, ESTADOCIVIL=? WHERE IDCOLABORADOR=?',
        [nombre, apellido, direccion, edad, profesion, estadoCivil, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al Actualizar colaborador");
            } else {
                res.send(result);
            }
        }
    );
});

// Ruta DELETE para eliminar un colaborador
app.delete('/colaborador/:id', (req, res) => {
    const id  = req.params.id; // Obtener el ID desde los parámetros de la URL

    db.query('DELETE FROM COLABORADOR WHERE IDCOLABORADOR=?', id,
        (err,result)=>{
            if(err){
                console.log(err);
            } else{
                res.send(result)
            }
        } 
)});



app.listen(3001, () => {
    console.log("corriendo en el puerto 3001")
})