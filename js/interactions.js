window.addEventListener("load", function() {
    //Capturo los botones para abrir y cerrar el menu desplegable
    let openMenu = document.getElementById("openMenu")
    let closeMenu =  document.getElementById("closeMenu")

    //Al abrir el menu, su width pasa a 550px, y el fondo del main se blurea
    openMenu.addEventListener("click", function(){
        document.getElementById("mySidenav").style.width = "550px";
        document.querySelector("main").style.filter ="blur(3px)";
    })
    
    //Al cerrar el menu, su width pasa a 0px, y le saco el blur al fondo
    closeMenu.addEventListener("click", function(){
        document.getElementById("mySidenav").style.width = "0";
        document.querySelector("main").style.filter ="blur(0px)";
    })
  
    //Capturo el boton que nos lleva arriba de todo.
    buttonTop = document.getElementById("btnTop");

    //Cuando el usuario scrollea 750px, aparece el boton
    window.onscroll = function() { scrollFunction() };

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
})