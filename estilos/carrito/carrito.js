document.addEventListener('DOMContentLoaded', () => {
    const elementosCarrito = document.getElementById('elementosCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');

    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        elementosCarrito.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            elementosCarrito.innerHTML = '<p>El carrito está vacío.</p>';
            totalCarrito.textContent = 'Total: $0.00';
            return;
        }

        const itemsHtml = carrito.map(item => {
            total += item.precio * item.cantidad;
            return `
                <div class="item-carrito">
                    <span>${item.nombre} (x${item.cantidad})</span>
                    <div>
                        <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                        <button class="btn-eliminar-item" data-id="${item.id}">Eliminar</button>
                    </div>
                </div>
            `;
        });

        elementosCarrito.innerHTML = itemsHtml.join('');
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

        // Eventos para eliminar productos individuales
        const botonesEliminar = document.querySelectorAll('.btn-eliminar-item');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => {
                eliminarProductoDelCarrito(boton.getAttribute('data-id'));
            });
        });
    }

    function eliminarProductoDelCarrito(id) {
        let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
        renderizarCarrito();
    }

    btnVaciarCarrito.addEventListener('click', () => {
        localStorage.removeItem('carritoDeCompras');
        renderizarCarrito();
    });

    renderizarCarrito();
});
