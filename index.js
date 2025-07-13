document.addEventListener('DOMContentLoaded', () => {
    const productosDisponibles = [
        {
            id: '1',
            nombre: 'Tabla Dragon',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 99,
            imagen: 'img/productos/tabla-dragon.jpg'
        },
        {
            id: '2',
            nombre: 'Lija Negra',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 48,
            imagen: 'img/productos/lijaskate.jpg'
        },
        {
            id: '3',
            nombre: 'Casco Negro',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 65,
            imagen: 'img/productos/casco-negro.jpg',
            claseDesc: 'casco-descripcion'
        },
        {
            id: '4',
            nombre: 'Ruedas',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 35,
            imagen: 'img/productos/ruedas-skate.jpg'
        },
        {
            id: '5',
            nombre: 'Tornillos skate (allen)',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 15,
            imagen: 'img/productos/tornillos-skateboard.jpg'
        },
        {
            id: '6',
            nombre: 'Trucks skate (105mm)',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 75,
            imagen: 'img/productos/trucks skate.jpg'
        },
        {
            id: '7',
            nombre: 'Zapatillas Fallen',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 58,
            imagen: 'img/productos/zapatillas skate.jpg',
    claseDesc: 'zapatillas-descripcion'
        },
        {
            id: '8',
            nombre: 'Mochila',
            descripcion: 'Lorem ipsum dolor sit amet.',
            precio: 78,
            imagen: 'img/productos/mochila-skate.jpg'
        }
    ];

    const contenedor = document.getElementById('productos-container');

    function renderizarProductos() {
        const productosHtml = productosDisponibles.map(producto => {
            return `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="producto-descripcion${producto.claseDesc ? ' ' + producto.claseDesc : ''}">
                        <span>${producto.nombre}</span>
                        <h5>${producto.descripcion}</h5>
                        <h4>$${producto.precio}</h4>
                    </div>
                    <button class="btn-agregar-carrito" id="btn-agregar-${producto.id}">Agregar al Carrito</button>
                </div>
            `;
        });

        contenedor.innerHTML = productosHtml.join('');
        adjuntarEventosAgregarCarrito();
    }

    function adjuntarEventosAgregarCarrito() {
        productosDisponibles.forEach(producto => {
            const boton = document.getElementById(`btn-agregar-${producto.id}`);
            if (boton) {
                boton.addEventListener('click', () => {
                    agregarProductoAlCarrito(producto);
                });
            }
        });
    }

    function agregarProductoAlCarrito(productoAAgregar) {
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        const indiceProductoExistente = carrito.findIndex(item => item.id === productoAAgregar.id);

        if (indiceProductoExistente !== -1) {
            carrito[indiceProductoExistente].cantidad++;
        } else {
            carrito.push({
                id: productoAAgregar.id,
                nombre: productoAAgregar.nombre,
                precio: productoAAgregar.precio,
                cantidad: 1
            });
        }

        localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
        alert(`${productoAAgregar.nombre} agregado al carrito!`);
    }

    renderizarProductos();
});