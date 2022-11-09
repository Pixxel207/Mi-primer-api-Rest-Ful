const express = require('express');
const { Router } = require('express');
const app = express()

const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en puerto ${server.address().port}`)
})

const productos = [];

const routerProductos = Router();

// routerProductos.get('/',(req,res) =>{
//     res.json({
//         productos
//     })
// })

// routerProductos.post('/',(req,res)=>{
//     let producto = req.body;
//     productos.push(producto);
//     console.log("Se agrego un producto al carrito :)")
//     res.json({
    
//         msg: 'Se agrego el producto :)'
//     })
// })

// ---------------------------------------------------------------------------------------------------------------------

routerProductos.get('/', (req,res) => {
    res.json({productos});
})

routerProductos.get('/:id', (req,res) => {
    const id = req.params.id;
    if(isNaN(id))//valido si el id ingresado en la url es un numero, si no lo es corto y mando un error
    {
        res.status(400);
        res.json({error: 'El valor ingresado no es un numero.'})
    }

    let objProducto = productos.find(x => x.id == id);//busco en el arreglo de productos por ese id y guardo ese objeto en objProducto, lo muestro en json
    if(objProducto != null)
        res.json(objProducto);
    else
    {
       res.status(400);
       res.json({error: 'Producto no encontrado.'})     
    }
})

routerProductos.post('/', (req,res) => {
    let producto = req.body;
    let idNuevo = 0;
    if(productos.length > 0){// si el arreglo ya tiene un producto, sumo +1 a ese id para setear en el nuevo producto
        idNuevo = productos.length + 1;}
    else{
        idNuevo = 1;
    }//no hay productos en el arreglo, primer producto con id = 1
       
    const nuevoProducto = { //creo objeto producto obteniendo los datos de la solicitud(body), y creo el nuevo id
        id: idNuevo,
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail
    }
    
    productos.push(nuevoProducto);
    res.json({mensaje: 'Se agrego el producto correctamente.'})
    console.log(nuevoProducto);
})

routerProductos.put('/:id', (req,res) => {
    const id = req.params.id;
    if(isNaN(id))
    {
        res.status(400);
        res.json({error: 'El valor ingresado no es un numero.'})
    }

    const indice = productos.findIndex(x => x.id == id);//findIndex devuelve el indice del producto, -1 si no se cumple la condicion
    if(indice != -1)
    {
        let producto = req.body;
        productos[indice].title = producto.title;
        productos[indice].price = producto.price;
        productos[indice].thumbnail = producto.thumbnail;
        res.json({mensaje: 'Se ha actualizado la producto con exito.'})
    }
    else
    {
        req.status(400);
        res.json({error: "Producto no encontrado."})
    }
})

routerProductos.delete('/:id', (req,res) => {
    const id = req.params.id;
    if(isNaN(id))
    {
        res.status(400);
        res.json({error: 'El valor ingresado no es un numero.'})
    }

    const indice = productos.findIndex(x => x.id == id);
    if(indice != 0)
    {
        productos.splice(indice, 1);
        res.json({mensaje: 'El producto ha sido eliminado.'});
    }
    else
    {
        req.status(400);
        res.json({error: "Producto no encontrado."})
    }
})


app.use('/productos/',routerProductos) ;