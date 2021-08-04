$(document).ready(function() {
    //Funcion para setear items en el local storage
    function setLocal(key, value) {
        localStorage.setItem(key, value);
    }
    //Funcion para actualizar los items en el local storage 
    function setLocalCart(carrito){
        setLocal("Carrito", JSON.stringify(carrito));
    }

    //Variable que contiene todos los productos, en un archivo json
    const URLJSON = "data/products.json";
    
    //Inicializo la variable global vacia, para actualizarla luego de la llamada AJAX
    let productsJSON;

    //Metodo getJSON de AJAX para agregar los productos del archivo json estático
    $.getJSON(URLJSON, function(response, state){
        if(state === "success"){
            let products = response.products;
            setLocal("Productos", JSON.stringify(products));
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
            //Capturo los botones de "agregar al carrito" de cada producto.
            let boton = $(".cart-button");
            for (let i = 0; i < boton.length; i++) {
                boton[i].addEventListener("click", function() {
                    addCart(boton[i].id);
                })
            }
            productsJSON = JSON.parse(localStorage.getItem("Productos"));
        }
    })  


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
            let items = productsJSON.filter(product => product.id == id);
            let item = items[0];
            Object.defineProperty(item, 'amount', { value: 1, writable: true });
            carrito.push( { ...item, amount: 1});
            setLocalCart(carrito);

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
                                <div id=cart${item.id} class="textCart">
                                    <p>${item.name}</p>
                                    <p>${item.description}</p>
                                    <p>$${item.price}</p>
                                    <div>
                                        <button class="subtractButton" id=subtractButton${item.id}>-</button>
                                        <span id=itemAmount${item.id}>${item.amount}</span>
                                        <span>Unidad(es)</span>
                                        <button class="addButton" id=addButton${item.id}>+</button>
                                        <button class="btnDelete" id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>`;
                            
        $("#itemCart").append(listCards);

        $(`#${item.id}`).click(function(){
            $(`#cart${item.id}`).parent().remove();
            setLocalCart(carrito);
            deleteItem(`${item.id}`);
        });

        addButton(item);
        subtractButton(item);

        calculatePrice();

    }

    //Funcion para eliminar un producto del carrito
    function deleteItem(id){
        let filtered = carrito.filter(item => item.id != id);
        carrito = filtered;
        if(carrito.length == 0){
            localStorage.removeItem("Carrito");
        }else{
            localStorage.setItem("Carrito", JSON.stringify(carrito));
        }
        countCart();
        calculatePrice();
    }

    //Funcion para sumar un producto en el carrito
    function addButton(item) {
        $(`#addButton${item.id}`).on("click", function() {
            let objectCart = carrito.find(({ id }) => id == item.id);
            if (objectCart.amount == 99) {
                objectCart.amount;
                calculatePrice();
                setLocalCart(carrito);
            } else {
                objectCart.amount++;
                calculatePrice();
                setLocalCart(carrito);
            }
            $(`#itemAmount${item.id}`).text(objectCart.amount);
        })
    }

    //Funcion para restar un producto en el carrito
    function subtractButton(item) {
        $(`#subtractButton${item.id}`).on("click", function() {
            let objectCart = carrito.find(({ id }) => id == item.id);
            if (objectCart.amount == 1) {
                objectCart.amount;
                calculatePrice();
                setLocalCart(carrito);
            } else {
                objectCart.amount--;
                calculatePrice();
                setLocalCart(carrito);
            }
            $(`#itemAmount${item.id}`).text(objectCart.amount);
        })
    }

    function calculatePrice() {
        let countPrice = $(".totalPrice");
        let total = carrito.reduce( (acc, prod) => acc + (prod.price * prod.amount), 0)
        countPrice[1].innerText = `$${total}`;
    }

    calculatePrice();

    /*Al hacer click en el boton, va a mandar una alerta si el carrito esta vacio, 
    y de no ser asi, va a mandar otra alerta que notifique la compra, vaciando ademas el localStorage*/
    $("#btnBuy").on("click", function(e) {
        if (carrito == 0) {
            e.preventDefault();
            Swal.fire('Su carrito esta vacio')
        } else {
            let random = Math.random();
            Swal.fire({
                icon: 'success',
                title: '¡Su compra ha sido exitosa!',
                text: "ID de compra: " + random.toString().slice(2),
                showConfirmButton: false,
                timer: 2000
            })
            localStorage.removeItem("Carrito");
            carrito = [];
            setTimeout(function() { 
                $("#itemCart").html(""); 
                calculatePrice();
            }, 2000);
            countCart();
        }
    })

    //Al hacer click en el boton, vacia el localStorage, y recarga la página
    $("#btnEmpty").on("click", function() {
        localStorage.removeItem("Carrito");
        carrito = [];
        $("#itemCart").html("");
        countCart();
        calculatePrice();
    })
});