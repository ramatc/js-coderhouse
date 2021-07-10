window.addEventListener("load", function() {
    //Llamado a las sections principales del body, para insertarles los productos
    let mainSection = document.getElementsByClassName("main-article");
   
    //Funcion para setear items en el local storage
    function setLocal(key, value){
        localStorage.setItem(key, value);
    }
    
    //Declaracion de array con el listado de productos 
    const products = [
    {id: 1, img:"astroworld.jpg", name: "Travis Scott", description: "ASTROWORLD Vinyl Record", price: 2500, class: "vinyl"},
    {id: 2, img:"igor.jpg", name: "Tyler, The Creator", description: "THE IGOR LP Vinyl Record", price: 1300, class: "vinyl"},
    {id: 3, img:"take-care.jpg", name: "Drake", description: "TAKE CARE Vinyl Record", price: 1100, class: "vinyl"},
    {id: 4, img:"slim-shady.jpg", name: "Eminem", description: "SLIM SHADY LP Vinyl Record", price: 1700, class: "vinyl"},
    {id: 5, img:"xxxtentacion.jpg", name: "XXXTentacion", description: "BAD VIBES FOREVER CD", price: 850, class: "cd"},
    {id: 6, img:"juice.jpg", name: "Juice WRLD", description: "DEATH RACE FOR LOVE CD", price: 500, class: "cd"},
    {id: 7, img:"kendrick.jpg", name: "Kendrick Lamar", description: "GOOD KID M.A.A.D CITY CD", price: 650, class: "cd"},
    {id: 8, img:"postmalone.jpg", name: "Post Malone", description: "HOLLYWOOD BLEEDING CD", price: 450, class: "cd"}];
 
    for (const product of products) {
        if (product.class === "vinyl") {
            let contenedor = document.createElement("article");
            contenedor.innerHTML = `<img src="img/${product.img}" alt="${product.description}">
                                    <h3 class="title-product">${product.name}</h3>
                                    <p class="description-product">${product.description}</p>
                                    <p class="price-product">$${product.price}</p>
                                    <button class="cart-button" id=${product.id}>Agregar al carrito <i class="fas fa-shopping-cart"></i></button>`;
            mainSection[0].appendChild(contenedor);
        }else{
            let contenedor = document.createElement("article");
            contenedor.innerHTML = `<img src="img/${product.img}" alt="${product.description}">
                                    <h3 class="title-product">${product.name}</h3>
                                    <p class="description-product">${product.description}</p>
                                    <p class="price-product">$${product.price}</p>
                                    <button class="cart-button" id=${product.id}>Agregar al carrito <i class="fas fa-shopping-cart"></i></button>`;
            mainSection[1].appendChild(contenedor);
        }
    }
 
    //Capturo los botones de "agregar al carrito" de cada producto.
    let boton = document.getElementsByClassName("cart-button");
    for (let i = 0; i < boton.length; i++) {
        boton[i].addEventListener("click",function() {
           addCart(boton[i].id);
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
               onClick: function(){} 
             }).showToast();
        })
    }

    // localStorage.clear()

    //Declaracion de array vacio para agregar los productos que se sumen al carrito
    let carrito = [];

    //Parsea el carrito que esta en localStorage, y chequea si hay algo dentro del carrito para mantenerlo
    let cartAmount = 0
    
    let carritoParseado = JSON.parse(localStorage.getItem("Carrito"));
    if(carritoParseado){
        carrito = carritoParseado
        cartAmount = carritoParseado.length
    }
   
    let cartNumber = document.querySelector(".cartNumber")
    function countCart(){
        cartAmount = carrito.length
        cartNumber.innerText = cartAmount
    }
    countCart();

    //Funcion para agregar items al carrito, donde los filtra por id, y los pushea al array "carrito"
    function addCart(id){
        let items = products.filter(product => product.id == id);
        let item = items[0];
        carrito.push({id: item.id, img: item.img, name: item.name, description: item.description, price: item.price});
        setLocal("Carrito", JSON.stringify(carrito));
        countCart();
    }

    //Llamado al formulario y todos sus elementos para validarlo
    let form = document.getElementById("form");
    let name = document.getElementById("name");
    let email = document.getElementById("mail");
    let tel = document.getElementById("tel");
    let msg = document.getElementById("msg");
    let buttonSubmit = document.getElementById("button-submit");
    
    //Llamado a los divs de errores para agregar un mensaje al formulario
    let erName = document.querySelector(".erName")
    let erEmail = document.querySelector(".erEmail")
    let erTel = document.querySelector(".erTel")
    let erMsg = document.querySelector(".erMsg")

    //Formato para validar emails
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    name.addEventListener('blur',function(){
        if(name.value == "" ){
            name.classList.add('is-invalid'); 
            name.classList.remove('is-valid');
            erName.innerText = "Tienes que ingresar un nombre" 
        } else if(name.value.length < 2){
            name.classList.add('is-invalid'); 
            name.classList.remove('is-valid');
            erName.innerText = "Debes usar 2 caracteres o más" 
        } else {
            name.classList.remove('is-invalid');
            name.classList.add('is-valid'); 
            erName.innerText = ""
        }
    })

    email.addEventListener('blur',function(){
        if(email.value == "" ){
            email.classList.add('is-invalid'); 
            email.classList.remove('is-valid');
            erEmail.innerText = "Tienes que ingresar un correo electronico" 
        } else if(!email.value.match(mailFormat)){
            email.classList.add('is-invalid');  
            email.classList.remove('is-valid'); 
            erEmail.innerText = "Debes ingresar un formato de correo valido"
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');   
            erEmail.innerText = ""
        }
    })

    tel.addEventListener('blur',function(){
        if(tel.value == "" ){
            tel.classList.add('is-invalid'); 
            tel.classList.remove('is-valid'); 
            erTel.innerText = "Tienes que ingresar un número de telefono" 
        } else if(tel.value.length < 8){
            tel.classList.add('is-invalid'); 
            tel.classList.remove('is-valid'); 
            erTel.innerText = "Debes ingresar un número de telefono valido, con al menos 8 digitos" 
        }else{
            tel.classList.remove('is-invalid');
            tel.classList.add('is-valid'); 
            erTel.innerText = ""
        }
    })

    msg.addEventListener('blur',function(){
        if(msg.value == "" ){
            msg.classList.add('is-invalid'); 
            msg.classList.remove('is-valid'); 
            erMsg.innerText = "Tienes que ingresar un mensaje" 
        } else {
            msg.classList.remove('is-invalid');
            msg.classList.add('is-valid'); 
            erMsg.innerText = ""
        }
    })

    buttonSubmit.addEventListener('click',function(e){
        e.preventDefault()
        let errores = {};

        if(name.value == ""){
            errores.name = "Tienes que ingresar un nombre"
            name.classList.add('is-invalid');  
        }else if(name.value.length < 2){
            errores.name = "Debes usar 2 caracteres o más" 
            name.classList.add('is-invalid');  
        };

        if(email.value == ""){
            errores.email = "Tienes que ingresar un correo electronico"
            email.classList.add('is-invalid');  
        }else if(!email.value.match(mailFormat)){
            errores.email = "Debes ingresar un formato de correo valido"
            email.classList.add('is-invalid'); 
        };

        if(tel.value == ""){
            errores.tel = "Tienes que ingresar un número de telefono"
            tel.classList.add('is-invalid');  
        }else if(tel.value.length < 8){
            errores.tel = "Debes ingresar un número de telefono valido, con al menos 8 digitos" 
            tel.classList.add('is-invalid'); 
        };

        if(msg.value == ""){
            errores.msg = "Tienes que ingresar un mensaje"
            msg.classList.add('is-invalid');  
        };
    
        if(Object.keys(errores).length >= 1){
            erName.innerText = (errores.name) ? errores.name : ' ';
            erEmail.innerText = (errores.email) ? errores.email : ' ';
            erTel.innerText = (errores.tel) ? errores.tel : ' ';
            erMsg.innerText = (errores.msg) ? errores.msg : ' ';
           
        } else {
            setTimeout(function(){ form.submit(); }, 2500);
            Swal.fire({
                icon: 'success',
                title: '¡Su mensaje se ha enviado exitosamente!',
                text: 'Lo contactaremos a la brevedad',
                showConfirmButton: false,
                timer: 2500
              })
            }
        })
    })

    //Capturo el boton que nos lleva arriba de todo.
    buttonTop = document.getElementById("btnTop");

    //Cuando el usuario scrollea 750px, aparece el boton
    window.onscroll = function() {scrollFunction()};
    
    function scrollFunction() {
      if (document.body.scrollTop > 750 || document.documentElement.scrollTop > 750) {
        buttonTop.style.display = "block";
      } else {
        buttonTop.style.display = "none";
      }
    }

    //Cuando el usuario clickea el boton, lo lleva hacia arriba de todo.
    function topFunction() {
      document.documentElement.scrollTop = 0; //Chrome, Firefox, Internet Explorer y Opera
      document.body.scrollTop = 0; //Safari
    }

    buttonTop.addEventListener("click", topFunction);
    