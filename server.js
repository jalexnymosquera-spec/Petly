const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Datos simulados en memoria para probar el MVP
let productos = [
  { id: 1, nombre: "Concentrado Chunky Adultos 25kg", precio: 185000, stock: 10, categoria: "Alimento" },
  { id: 2, nombre: "Antipulgas NexGard 10-25kg", precio: 62000, stock: 5, categoria: "Medicamentos" },
  { id: 3, nombre: "Shampoo Hipoalergénico 500ml", precio: 28000, stock: 8, categoria: "Aseo" }
];

// Ruta 1: Comprobar que el servidor vive
app.get('/', (req, res) => {
  res.send('Servidor de Petly funcionando correctamente 🐾');
});

// Ruta 2: GET /api/productos - Listar catálogo
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// Ruta 3: POST /api/productos - Registrar producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio, stock, categoria } = req.body;
  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio,
    stock,
    categoria
  };
  productos.push(nuevoProducto);
  res.status(201).json({ mensaje: "Producto registrado con éxito", producto: nuevoProducto });
});

// Ruta 4: PATCH /api/productos/:id/descontar - Venta rápida 1-clic en mostrador
app.patch('/api/productos/:id/descontar', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  if (producto.stock <= 0) {
    return res.status(400).json({ error: "Sin existencias disponibles" });
  }

  producto.stock -= 1;
  res.json({ mensaje: `Venta registrada. Stock restante de ${producto.nombre}: ${producto.stock}` });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Petly corriendo en http://localhost:${PORT}`);
});