window.addEventListener("load", function() {
    //Llamado a las sections principales del body, para insertarles los productos
    let mainSection = document.getElementsByClassName("main-article");

    //Llamado al carrito, donde se van a insertar los productos comprados
    let cartItem = document.getElementById("itemCart");

    let totalPrice = 0;

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

    //A traves del metodo for...of, añadimos todos los productos del array mediante plantillas
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
    let cartNumber = document.querySelector(".cartNumber")
    function countCart() {
        cartAmount = carrito.length
        cartNumber.innerText = cartAmount
    }

    countCart();

    //Capturo los botones de "agregar al carrito" de cada producto.
    let boton = document.getElementsByClassName("cart-button");
    for (let i = 0; i < boton.length; i++) {
        boton[i].addEventListener("click", function() {
            addCart(boton[i].id);
        })
    }
    
    //Funcion para agregar items al carrito, donde los filtra por id, y los pushea al array "carrito"
    function addCart(id) {
        const validar = carrito.find(producto => producto.id  == id);
        if(validar){
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

        }else{
            let items = products.filter(product => product.id == id);
            let item = items[0];
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

            addButton();

        }
    }

    //Funcion para renderizar en el carrito todos los objetos que se hayan pusheado anteriormente dentro del array carrito
    function renderCart(item){
        const listCards = `<img src="img/${item.img}" alt="${item.description}">
                           <div class="textCart">
                                <p>${item.name}</p>
                                <p>${item.description}</p>
                                <p>$${item.price}</p>
                                <div>
                                    <button class="subtractButton" id=subtractButton${item.id}>-</button>
                                    <span class="itemAmount">${item.amount}</span>
                                    <span>Unidad(es)</span>
                                    <button class="addButton" id=addButton${item.id}>+</button>
                                </div>
                            </div>`;
        let contenedor = document.createElement("div");
        contenedor.setAttribute("class", "articleCart");
        contenedor.innerHTML = listCards;
        cartItem.appendChild(contenedor);
    }

    //Capturo los botones para eliminar un item del carrito
    let buttonDelete = document.getElementsByClassName("btnDelete")
    for (let i = 0; i < buttonDelete.length; i++){
        buttonDelete[i].addEventListener("click", function(){
            deleteItem(buttonDelete[i].id);
        })
    }

    //Capturo los botones para sumar o restar productos en el carrito
    let contadorCarrito = document.querySelector(".itemAmount")

    function addButton(){
        let addButton = document.getElementsByClassName("addButton");
        for (let i = 0; i < addButton.length; i++) {
            addButton[i].addEventListener("click", function() {
                let items = products.filter(product => product.id == (addButton[i].id).substr(9));
                let item = items[0];
                let numeroCarrito = item.amount += 1;
                contadorCarrito.innerText = numeroCarrito
                console.log(contadorCarrito);

            })
        }
    }

    addButton();

    function subtractButton(){
        let subtractButton = document.getElementsByClassName("subtractButton");
        for (let i = 0; i < subtractButton.length; i++) {
            subtractButton[i].addEventListener("click", function() {
                let items = products.filter(product => product.id == (subtractButton[i].id).substr(14));
                let item = items[0];
                let numeroCarrito = item.amount -= 1;
                contadorCarrito.innerText = numeroCarrito
                console.log(contadorCarrito);

            })
        }
    }

    subtractButton();

    //Capturo los botones para finalizar la compra y vaciar el carrito
    let buttonBuy = document.getElementById("btnBuy");
    let buttonEmpty = document.getElementById("btnEmpty");

    /*Al hacer click en el boton, va a mandar una alerta si el carrito esta vacio, 
    y de no ser asi, va a mandar otra alerta que notifique la compra, vaciando ademas el localStorage*/
    buttonBuy.addEventListener("click", function(e){
        if(carrito == 0){
            e.preventDefault();
            Swal.fire('Su carrito esta vacio')
        }else{
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
    buttonEmpty.addEventListener("click", function(){
        localStorage.clear();
        location.reload();
        countCart();
    })
})