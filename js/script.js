window.addEventListener("load", function() {
    function saludar() {
        let nombreIngresado = prompt("Ingresé su nombre")
        alert("Bienvenido a nuestro sitio " + nombreIngresado)
    }
    function compraFinalizada() {
        alert("Gracias por su compra!!!")
    }

    function precioEnCutas(precio, cuotas) {
        switch (cuotas) {
            case 3:
                alert("Usted debera realizar 3 pagos de $" + (precio / cuotas));
                compraFinalizada();
                break;
            case 6:
                alert("Usted debera realizar 6 pagos de $" + (precio / cuotas));
                compraFinalizada();
                break;
            case 12:
                alert("Usted debera realizar 12 pagos de $" + (precio / cuotas));
                compraFinalizada();
                break;
            case 18:
                alert("Usted debera realizar 18 pagos de $" + (precio / cuotas));
                compraFinalizada();
                break;
            default:
                alert("Ingresé una cantidad de cuotas valida")
                break;
        }
    }

    saludar();

    realizarCompra = confirm("¿Desea realizar una compra?");

    let precioTotal = 0;
    if (realizarCompra != false) {
        let cantidadProductos = parseInt(prompt("¿Cuantos productos desea comprar?"));
        for (let i = 1; i <= cantidadProductos; i++) {
            let precio = parseFloat(prompt("Ingresé el precio del producto " + i));
            precioTotal = precioTotal + precio;
        }
        alert("El costo total de sus productos es de: " + precioTotal);

        let cantCuotas = parseInt(prompt("¿En cuantas cuotas desea realizar su pago: 3, 6, 12 o 18?"));
        precioEnCutas(precioTotal, cantCuotas)
    } else {
        
    }

    //Clase constructora para crear el objeto Producto
    class Producto {
        constructor(nombre, descripcion, precio) {
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.precio = parseFloat(precio);
            this.vendido = false;
        }
        vender() {
            this.vendido = true;
        }
        mostrarProducto() {
            console.log("El producto creado se llama " + this.nombre + ", y tiene un precio de $" + this.precio);
        }
    }

    //Clase constructora para crear el objeto Usuario
    class Usuario {
        constructor(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = parseInt(edad);
            this.admin = false;
        }
        hacerAdmin(){
            this.admin = true;
        }
        mostrarUsuario() {
            console.log("El usuario registrado se llama " + this.nombre + " " + this.apellido + ", y tiene " + this.edad + " años");
        }
    }

    //Declaracion de arrays vacios para ser utilizados luego
    const productos = [];
    const usuarios = [];

    //Si la condicion es true, se procedera a crear un usuario o un producto, lo que elija el cliente
    let condicion = confirm("¿Quieres crear un usuario o un producto?");
    if(condicion == true){
        do {
    
            let crearObjeto = prompt("Elija una de las dos opciones: producto o usuario")
    
            if (crearObjeto.toLowerCase() == "producto") {
                let nombre = prompt("Ingresé el nombre del producto");
                let descripcion = prompt("Ingresé la descripcion del producto");
                let precio = prompt("Ingresé el precio del producto");
                
                productos.push(new Producto(nombre, descripcion, precio));
            
                function totalProductos(productos) {
                    console.log("El total de productos en la base de datos es: " + productos.length);
                }
    
                for (const producto of productos) {
                    producto.mostrarProducto();
                }
                
                totalProductos(productos);
                console.log("-------------------------------");

            } else if (crearObjeto.toLowerCase() == "usuario") {
                let nombre = prompt("Ingresé el nombre del usuario");
                let apellido = prompt("Ingresé el apellido del usuario");
                let edad = prompt("Ingresé la edad del usuario");
                
                usuarios.push(new Usuario(nombre, apellido, edad));

                function totalUsers(usuarios) {
                    console.log("El total de usuarios en la base de datos es: " + usuarios.length);
                }
               
                for (const usuario of usuarios) {
                    usuario.hacerAdmin();
                    usuario.mostrarUsuario();
                }

                totalUsers(usuarios);
                console.log("-------------------------------");
    
            } else {
                alert("Seleccione una de las dos opciones")
            }
    
            condicion = confirm("¿Queres seguir agregando productos o usuarios?")
    
        } while (condicion != false) //Mientras la condicion sea distitna de falso, se va a volver a ejuctar la operación 
    }else{
        alert("¡Gracias por visitarnos, saludos!")
    }

    //Total de usuarios y de productos mostrados por consola
    console.log("Listado con todos los usuarios creados");
    console.log(usuarios);
    console.log("Listado con todos los productos creados");
    console.log(productos);

    //Filtracion de los productos mas baratos, mostrado por consola
    const productosBaratos = productos.filter(producto => producto.precio < 1000);
    console.log("Los productos mas baratos son:");
    console.log(productosBaratos);

    //El precio de cada producto con su IVA correspondiente, mostrado por consola
    const productosIva = productos.map(producto => producto.precio * 1.21);
    console.log("El precio de los productos con IVA es de:");
    console.log(productosIva);
})