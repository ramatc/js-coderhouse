$(document).ready(function() {
    //Al abrir el menu, su width pasa a 550px, y el fondo del main se blurea
    $("#openMenu").on("click", function(){
        $("#mySidenav").css("width", "550px");
        $("main").css("filter", "blur(3px)");
    })
    
    //Al cerrar el menu, su width pasa a 0px, y le saco el blur al fondo
    $("#closeMenu").on("click", function(){
        $("#mySidenav").css("width", "0px");
        $("main").css("filter", "blur(0px)");
    })
  
    //Capturo el boton que nos lleva arriba de todo.
    buttonTop = $("#btnTop");

    //Cuando el usuario scrollea 750px, aparece el boton
    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 750 || document.documentElement.scrollTop > 750) {
            buttonTop.css("display","block");
        } else {
            buttonTop.css("display","none");
        }
    }

    //Cuando el usuario clickea el boton, lo lleva hacia arriba de todo.
    function topFunction() {
        document.documentElement.scrollTop = 0; //Chrome, Firefox, Internet Explorer y Opera
        document.body.scrollTop = 0; //Safari
    }

    buttonTop.on("click", topFunction);
})