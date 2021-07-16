$(document).ready(function() {
    //Funcion para setear items en el local storage
    function setLocal(key, value) {
        localStorage.setItem(key, value);
    }

    //Declaracion de array con el listado de productos 
    const products = [
        { id: 1, img: "astroworld.jpg", name: "Travis Scott", description: "ASTROWORLD Vinyl Record", price: 2500, class: "vinyl" },
        { id: 2, img: "igor.jpg", name: "Tyler, The Creator", description: "THE IGOR LP Vinyl Record", price: 1300, class: "vinyl" },
        { id: 3, img: "take-care.jpg", name: "Drake", description: "TAKE CARE Vinyl Record", price: 1100, class: "vinyl" },
        { id: 4, img: "slim-shady.jpg", name: "Eminem", description: "SLIM SHADY LP Vinyl Record", price: 1700, class: "vinyl" },
        { id: 5, img: "xxxtentacion.jpg", name: "XXXTentacion", description: "BAD VIBES FOREVER CD", price: 850, class: "cd" },
        { id: 6, img: "juice.jpg", name: "Juice WRLD", description: "DEATH RACE FOR LOVE CD", price: 500, class: "cd" },
        { id: 7, img: "kendrick.jpg", name: "Kendrick Lamar", description: "GOOD KID M.A.A.D CITY CD", price: 650, class: "cd" },
        { id: 8, img: "postmalone.jpg", name: "Post Malone", description: "HOLLYWOOD BLEEDING CD", price: 450, class: "cd" }
    ];

    //A traves del metodo for...of, añadimos todos los productos del array mediante plantillas
    for (const product of products) {
        const listCards = `<article>
                                <img src="img/${product.img}" alt="${product.description}">
                                <h3 class="title-product">${product.name}</h3>
                                <p class="description-product">${product.description}</p>
                                <p class="price-product">$${product.price}</p>
                                <button class="cart-button" id=${product.id}>Agregar al carrito <i class="fas fa-shopping-cart"></i></button>
                           </article>`;

        if (product.class === "vinyl") {
            $(".main-article-top").append(listCards);
        } else {
            $(".main-article-bottom").append(listCards);
        }
    }

    //Declaracion de array vacio para agregar los productos que se sumen al carrito
    let carrito = [];

    //Declaracion de variable para inicializar la cantidad de productos en el carrito, y luego sumarle los productos agregados
    let cartAmount = 0

    //Parsea el carrito que esta en localStorage, y chequea si hay algo dentro del carrito para mantenerlo
    let carritoParseado = JSON.parse(localStorage.getItem("Carrito"));
    if (carritoParseado) {
        carrito = carritoParseado;
        cartAmount = carritoParseado.length;

        for (const item of carritoParseado) {
            renderCart(item);
        }
    }

    //Actualiza la cantidad de productos en el carrito, a traves de la propiedad carrito.length 
    function countCart() {
        cartAmount = carrito.length
        $(".cartNumber").text(cartAmount);
    }

    countCart();

    //Capturo los botones de "agregar al carrito" de cada producto.
    let boton = $(".cart-button");
    for (let i = 0; i < boton.length; i++) {
        boton[i].addEventListener("click", function() {
            addCart(boton[i].id);
        })
    }

    //Funcion para agregar items al carrito, donde los filtra por id, y los pushea al array "carrito"
    function addCart(id) {
        const validar = carrito.find(producto => producto.id == id);
        if (validar) {
            Toastify({
                text: "El producto ya esta en tu carrito.",
                duration: 2500,
                destination: "",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                className: "alertCart",
                stopOnFocus: true,
                offset: {
                    x: 0,
                    y: 90
                },
                onClick: function() {}
            }).showToast();

        } else {
            let items = products.filter(product => product.id == id);
            let item = items[0];
            Object.defineProperty(item, 'amount', { value: 1, writable: true });
            carrito.push({ id: item.id, img: item.img, name: item.name, description: item.description, price: item.price, amount: item.amount });
            setLocal("Carrito", JSON.stringify(carrito));

            Toastify({
                text: "El producto fue agregado a tu carrito.",
                duration: 2500,
                destination: "",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                className: "alertBuy",
                stopOnFocus: true,
                offset: {
                    x: 0,
                    y: 90
                },
                onClick: function() {}
            }).showToast();

            countCart();

            renderCart(item);

        }
    }

    //Funcion para renderizar en el carrito todos los objetos que se hayan pusheado anteriormente dentro del array carrito
    function renderCart(item) {
        const listCards = `<div class="articleCart"> 
                                <img src="img/${item.img}" alt="${item.description}">
                                <div class="textCart">
                                    <p>${item.name}</p>
                                    <p>${item.description}</p>
                                    <p>$${item.price}</p>
                                    <div>
                                        <button class="subtractButton" id=subtractButton${item.id}>-</button>
                                        <span id=itemAmount${item.id}>${item.amount}</span>
                                        <span>Unidad(es)</span>
                                        <button class="addButton" id=addButton${item.id}>+</button>
                                    </div>
                                </div>
                            </div>`;
                            
        $("#itemCart").append(listCards);

        addButton(item);
        subtractButton(item);

        calculatePrice();

    }

    //Capturo los botones para eliminar un item del carrito
    let buttonDelete = $(".btnDelete")
    for (let i = 0; i < buttonDelete.length; i++) {
        buttonDelete[i].addEventListener("click", function() {
            deleteItem(buttonDelete[i].id);
        })
    }

    //Funcion para sumar un producto en el carrito
    function addButton(item) {
        $(`#addButton${item.id}`).on("click", function() {
            let objectCart = carrito.find(({ id }) => id == item.id);
            objectCart.amount++;
            $(`#itemAmount${item.id}`).text(objectCart.amount);
        })
    }

    //Funcion para restar un producto en el carrito
    function subtractButton(item) {
        $(`#subtractButton${item.id}`).on("click", function() {
            let objectCart = carrito.find(({ id }) => id == item.id);
            if (objectCart.amount == 1) {
                objectCart.amount;
            } else {
                objectCart.amount--;
            }
            $(`#itemAmount${item.id}`).text(objectCart.amount);
        })
    }

    let totalPrice = 0;

    function calculatePrice() {
        let countPrice = $(".totalPrice");
        countPrice[1].innerText = `$${carrito[0].price}`;
    }

    /*Al hacer click en el boton, va a mandar una alerta si el carrito esta vacio, 
    y de no ser asi, va a mandar otra alerta que notifique la compra, vaciando ademas el localStorage*/
    $("#btnBuy").on("click", function(e) {
        if (carrito == 0) {
            e.preventDefault();
            Swal.fire('Su carrito esta vacio')
        } else {
            Swal.fire({
                icon: 'success',
                title: '¡Su compra ha sido exitosa!',
                showConfirmButton: false,
                timer: 2000
            })
            setTimeout(function() { location.reload(); }, 2000);
            localStorage.clear();
            countCart();
        }
    })

    //Al hacer click en el boton, vacia el localStorage, y recarga la página
    $("#btnEmpty").on("click", function() {
        localStorage.clear();
        location.reload();
        countCart();
    })
});