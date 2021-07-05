window.addEventListener("load", function() {
    //Llamado a las sections principales del body, para insertarles los productos
    let mainSection = document.getElementsByClassName("main-article");
  
    //Declaracion de array con el listado de productos 
    const products = [
    {id: 1, img:"astroworld.jpg", name: "Travis Scott", description: "ASTROWORLD Vinyl Record", price: "2500", class: "vinyl"},
    {id: 2, img:"igor.jpg", name: "Tyler, The Creator", description: "THE IGOR LP Vinyl Record", price: "1300", class: "vinyl"},
    {id: 3, img:"slim-shady.jpg", name: "Eminem", description: "SLIM SHADY LP Vinyl Record", price: "1700", class: "vinyl"},
    {id: 4, img:"take-care.jpg", name: "Drake", description: "TAKE CARE Vinyl Record", price: "1100", class: "vinyl"},
    {id: 5, img:"xxxtentacion.jpg", name: "XXXTentacion", description: "BAD VIBES FOREVER CD", price: "850", class: "cd"},
    {id: 6, img:"kendrick.jpg", name: "Kendrick Lamar", description: "GOOD KID M.A.A.D CITY CD", price: "650", class: "cd"},
    {id: 7, img:"juice.jpg", name: "Juice WRLD", description: "DEATH RACE FOR LOVE CD", price: "500", class: "cd"},
    {id: 8, img:"postmalone.jpg", name: "Post Malone", description: "HOLLYWOOD'S BLEEDING CD", price: "450", class: "cd"}];

    for (const product of products) {
        if (product.class === "vinyl") {
            let contenedor = document.createElement("article");
            contenedor.innerHTML = `<img src="img/${product.img}" alt="${product.description}">
                                    <h3 class="title-product">${product.name}</h3>
                                    <p class="description-product">${product.description}</p>
                                    <p class="price-product">$${product.price}</p>
                                    <button class="cart-button">Agregar al carrito<i class="fas fa-shopping-cart"></i></button>`;
            mainSection[0].appendChild(contenedor);
        }else{
            let contenedor = document.createElement("article");
            contenedor.innerHTML = `<img src="img/${product.img}" alt="${product.description}">
                                    <h3 class="title-product">${product.name}</h3>
                                    <p class="description-product">${product.description}</p>
                                    <p class="price-product">$${product.price}</p>
                                    <button class="cart-button">Agregar al carrito<i class="fas fa-shopping-cart"></i></button>`;
            mainSection[1].appendChild(contenedor);
        }
    }
 
    //Declaracion de array vacio para agregar los productos que se sumen al carrito
    const carrito = [];

})