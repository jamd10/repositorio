const Inventario = require('../models/inventario'); // Importa el modelo de inventario

const list = async (req, res) => {
    try {
        const inventario = await Inventario.find();
        res.json(inventario);
    } catch (error) {
        res.status(500).json({ message: error.message, status: "error" });
    }
};

const create = async (req, res) => {
    const { nombre, cantidad } = req.body;
    const nuevoItem = new Inventario({ nombre, cantidad });
    try {
        const itemGuardado = await nuevoItem.save();
        res.send('Producto agregado con éxito');
    } catch (error) {
        res.status(500).json({ message: error.message, status: "error" });
    }
};

const update = async (req, res) => {
    const { nombre, cantidad } = req.body;
    try {
        await Inventario.updateOne({ nombre }, { cantidad: parseInt(cantidad) });
        res.send('Producto modificado con éxito');
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
};

const remove = async (req, res) => {
    const { nombre } = req.body;
    try {
        await Inventario.deleteOne({ nombre });
        res.send('Producto eliminado con éxito');
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
};

const showAddForm = (req, res) => {
    res.send(`
    <div style="text-align: center;">
        <h1>Agregar Nuevo Elemento al Inventario</h1>
        <form id="addForm" action="/inventory/agregar" method="post">
            <label for="nombre">Nombre del producto:</label><br>
            <input type="text" id="nombre" name="nombre" required><br>
            <label for="cantidad">Cantidad:</label><br>
            <input type="number" id="cantidad" name="cantidad" required><br>
            <button type="submit">Agregar</button>
        </form>
        <button onclick="window.location.href='/'">Regresar al Menú Principal</button>
    </div>
    <script>
        const form = document.getElementById('addForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const response = await fetch('/inventory/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: form.nombre.value,
                    cantidad: form.cantidad.value
                }),
            });
            const data = await response.text();
            alert(data);
            form.nombre.value = '';
            form.cantidad.value = '';
        });
    </script>
    `);
};

const showUpdateForm = (req, res) => {
    res.send(`
    <div style="text-align: center;">
        <h1>Modificar Elemento del Inventario</h1>
        <form id="updateForm" action="/inventory/modificar" method="post">
            <label for="nombre">Nombre del producto a modificar:</label><br>
            <input type="text" id="nombre" name="nombre" required><br>
            <label for="cantidad">Nueva cantidad:</label><br>
            <input type="number" id="cantidad" name="cantidad" required><br>
            <button type="submit">Modificar</button>
        </form>
        <button onclick="window.location.href='/'">Regresar al Menú Principal</button>
    </div>
    <script>
        const form = document.getElementById('updateForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const response = await fetch('/inventory/modificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: form.nombre.value,
                    cantidad: form.cantidad.value
                }),
            });
            const data = await response.text();
            alert(data);
            form.nombre.value = '';
            form.cantidad.value = '';
        });
    </script>
    `);
};

const showDeleteForm = (req, res) => {
    res.send(`
    <div style="text-align: center;">
        <h1>Eliminar Elemento del Inventario</h1>
        <form id="deleteForm" action="/inventory/eliminar" method="post">
            <label for="nombre">Nombre del producto a eliminar:</label><br>
            <input type="text" id="nombre" name="nombre" required><br>
            <button type="submit">Eliminar</button>
        </form>
        <button onclick="window.location.href='/'">Regresar al Menú Principal</button>
    </div>
    <script>
        const form = document.getElementById('deleteForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const response = await fetch('/inventory/eliminar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: form.nombre.value
                }),
            });
            const data = await response.text();
            alert(data);
            form.nombre.value = '';
        });
    </script>
    `);
};

module.exports = { list, create, update, remove, showAddForm, showUpdateForm, showDeleteForm };
