window.addEventListener("load", function() {
    //Llamado a las sections principales del body, para insertarles los productos
    let mainSection = document.getElementsByClassName("main-article");

    //Funcion para setear items en el local storage
    function setLocal(key, value) {
        localStorage.setItem(key, value);
    }

    //Declaracion de array con el listado de productos 
    const products = [
        { id: 1, img: "astroworld.jpg", name: "Travis Scott", description: "ASTROWORLD Vinyl Record", price: 2500, class: "vinyl", amount: 1 },
        { id: 2, img: "igor.jpg", name: "Tyler, The Creator", description: "THE IGOR LP Vinyl Record", price: 1300, class: "vinyl", amount: 1 },
        { id: 3, img: "take-care.jpg", name: "Drake", description: "TAKE CARE Vinyl Record", price: 1100, class: "vinyl", amount: 1 },
        { id: 4, img: "slim-shady.jpg", name: "Eminem", description: "SLIM SHADY LP Vinyl Record", price: 1700, class: "vinyl", amount: 1 },
        { id: 5, img: "xxxtentacion.jpg", name: "XXXTentacion", description: "BAD VIBES FOREVER CD", price: 850, class: "cd", amount: 1 },
        { id: 6, img: "juice.jpg", name: "Juice WRLD", description: "DEATH RACE FOR LOVE CD", price: 500, class: "cd", amount: 1 },
        { id: 7, img: "kendrick.jpg", name: "Kendrick Lamar", description: "GOOD KID M.A.A.D CITY CD", price: 650, class: "cd", amount: 1 },
        { id: 8, img: "postmalone.jpg", name: "Post Malone", description: "HOLLYWOOD BLEEDING CD", price: 450, class: "cd", amount: 1 }
    ];

    for (const product of products) {
        const listCards = `<img src="img/${product.img}" alt="${product.description}">
                           <h3 class="title-product">${product.name}</h3>
                           <p class="description-product">${product.description}</p>
                           <p class="price-product">$${product.price}</p>
                           <button class="cart-button" id=${product.id}>Agregar al carrito <i class="fas fa-shopping-cart"></i></button>`;

        if (product.class === "vinyl") {
            let contenedor = document.createElement("article");
            contenedor.innerHTML = listCards;
            mainSection[0].appendChild(contenedor);
        } else {
            let contenedor = document.createElement("article");
            contenedor.innerHTML = listCards;
            mainSection[1].appendChild(contenedor);
        }
    }

    //Capturo los botones de "agregar al carrito" de cada producto.
    let boton = document.getElementsByClassName("cart-button");
    for (let i = 0; i < boton.length; i++) {
        boton[i].addEventListener("click", function() {
            addCart(boton[i].id);
            location.reload();
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
        })
    }

    //Declaracion de array vacio para agregar los productos que se sumen al carrito
    let carrito = [];

    //Declaracion de variable para inicializar la cantidad de productos en el carrito, y luego sumarle los productos agregados
    let cartAmount = 0

    //Parsea el carrito que esta en localStorage, y chequea si hay algo dentro del carrito para mantenerlo
    let carritoParseado = JSON.parse(localStorage.getItem("Carrito"));
    if (carritoParseado) {
        carrito = carritoParseado
        cartAmount = carritoParseado.length
    }

    //Actualiza la cantidad de productos en el carrito, a traves de la propiedad carrito.length 
    let cartNumber = document.querySelector(".cartNumber")

    function countCart() {
        cartAmount = carrito.length
        cartNumber.innerText = cartAmount
    }

    if (cartAmount == 0) {
        cartNumber.innerText = "0"
    } else {
        countCart();
    }

    //Funcion para agregar items al carrito, donde los filtra por id, y los pushea al array "carrito"
    function addCart(id) {
        let items = products.filter(product => product.id == id);
        let item = items[0];
        carrito.push({ id: item.id, img: item.img, name: item.name, description: item.description, price: item.price, amount: item.amount });
        setLocal("Carrito", JSON.stringify(carrito));
        countCart();
    }
    
    let cartItem = document.getElementById("itemCart")
    for (const itemCart of carrito) {
        const listCards = `<img src="img/${itemCart.img}" alt="${itemCart.description}">
                           <div class="textCart">
                                <p>${itemCart.name}</p>
                                <p>${itemCart.description}</p>
                                <p>$${itemCart.price}</p>
                                <div>
                                    <button class="quantityButton">-</button>
                                    <span>${itemCart.amount}</span>
                                    <span>Unidad(es)</span>
                                    <button class="quantityButton">+</button>
                                </div>
                           </div>`;
            let contenedor = document.createElement("div");
            contenedor.setAttribute("class", "articleCart");
            contenedor.innerHTML = listCards;
            cartItem.appendChild(contenedor);
    }
})

//    localStorage.clear()