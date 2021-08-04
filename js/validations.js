$(document).ready(function(){
    //Llamado al formulario y todos sus elementos para validarlo
    let name = document.getElementById("name");
    let email = document.getElementById("mail");
    let tel = document.getElementById("tel");
    let msg = document.getElementById("msg");
    let buttonSubmit = document.getElementById("button-submit");

    //Llamado a los divs de errores para agregar un mensaje al formulario
    let erName = document.querySelector(".erName");
    let erEmail = document.querySelector(".erEmail");
    let erTel = document.querySelector(".erTel");
    let erMsg = document.querySelector(".erMsg");

    //Formato para validar caracteres
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let nameFormat = /^[a-zA-Z\s]*$/;

    //Agrego el evento 'blur' al campo name para validarlo
    name.addEventListener('blur', function() {
        //Si el campo esta vacio, no va a dejar enviarlo
        if (name.value == "") {
            name.classList.add('is-invalid');
            name.classList.remove('is-valid');
            erName.innerText = "Tienes que ingresar un nombre";
        //Si el campo es menor a dos caracteres, no va a dejar enviarlo
        } else if (name.value.length < 2) {
            name.classList.add('is-invalid');
            name.classList.remove('is-valid');
            erName.innerText = "Debes usar 2 caracteres o más";
        //Si el campo contiene numeros o algun caracter distinto a letras, no va a dejar enviarlo
        }else if(!name.value.match(nameFormat)){
            name.classList.add('is-invalid');
            name.classList.remove('is-valid');
            erName.innerText = "Debes ingresar un nombre valido";
        //Si no hay ningun error, se valida el campo
        } else {
            name.classList.remove('is-invalid');
            name.classList.add('is-valid');
            erName.innerText = "";
        }
    });

    //Agrego el evento 'blur' al campo email para validarlo
    email.addEventListener('blur', function() {
        //Si el campo esta vacio, no va a dejar enviarlo
        if (email.value == "") {
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
            erEmail.innerText = "Tienes que ingresar un correo electronico";
        //Si el campo no tiene formato de email, no va a dejar enviarlo
        } else if (!email.value.match(mailFormat)) {
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
            erEmail.innerText = "Debes ingresar un formato de correo valido";
        //Si no hay ningun error, se valida el campo
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
            erEmail.innerText = "";
        }
    });

    //Agrego el evento 'blur' al campo tel para validarlo
    tel.addEventListener('blur', function() {
        //Si el campo esta vacio, no va a dejar enviarlo
        if (tel.value == "") {
            tel.classList.add('is-invalid');
            tel.classList.remove('is-valid');
            erTel.innerText = "Tienes que ingresar un número de telefono";
        //Si el campo es menor a ocho caracteres, no va a dejar enviarlo
        } else if (tel.value.length < 8) {
            tel.classList.add('is-invalid');
            tel.classList.remove('is-valid');
            erTel.innerText = "Debes ingresar un número de telefono valido, con 8 o más digitos";
        //Si el campo es mayor a catorce caracteres, no va a dejar enviarlo
        } else if(tel.value.length > 14){
            tel.classList.add('is-invalid');
            tel.classList.remove('is-valid');
            erTel.innerText = "Debes ingresar un número de telefono valido, con menos de 14 digitos";
        //Si no hay ningun error, se valida el campo
        } else{
            tel.classList.remove('is-invalid');
            tel.classList.add('is-valid');
            erTel.innerText = "";
        }
    });

    //Agrego el evento 'blur' al campo msg para validarlo
    msg.addEventListener('blur', function() {
        //Si el campo esta vacio, no va a dejar enviarlo
        if (msg.value == "") {
            msg.classList.add('is-invalid');
            msg.classList.remove('is-valid');
            erMsg.innerText = "Tienes que ingresar un mensaje";
        //Si no hay ningun error, se valida el campo
        } else {
            msg.classList.remove('is-invalid');
            msg.classList.add('is-valid');
            erMsg.innerText = "";
        }
    });

    buttonSubmit.addEventListener('click', function(e) {
        //Previene que se envie el formulario
        e.preventDefault();
        //Array para acumular los errores
        let errores = {};

        //Validaciones para el campo name, como que no este vacio o que sea mayor a 2 caracteres
        if (name.value == "") {
            errores.name = "Tienes que ingresar un nombre";
            name.classList.add('is-invalid');
        } else if (name.value.length < 2) {
            errores.name = "Debes usar 2 caracteres o más";
            name.classList.add('is-invalid');
        }else if(!name.value.match(nameFormat)){
            errores.name = "Debes ingresar un nombre valido";
            name.classList.add('is-invalid');
        };

        //Validaciones para el campo email, como que no este vacio o que tenga formato de mail
        if (email.value == "") {
            errores.email = "Tienes que ingresar un correo electronico";
            email.classList.add('is-invalid');
        } else if (!email.value.match(mailFormat)) {
            errores.email = "Debes ingresar un formato de correo valido";
            email.classList.add('is-invalid');
        };

        //Validaciones para el campo tel, como que no este vacio o que tenga al menos 8 digitos
        if (tel.value == "") {
            errores.tel = "Tienes que ingresar un número de telefono";
            tel.classList.add('is-invalid');
        } else if (tel.value.length < 8) {
            errores.tel = "Debes ingresar un número de telefono valido, con 8 o más digitos";
            tel.classList.add('is-invalid');
        } else if(tel.value.length > 14){
            errores.tel = "Debes ingresar un número de telefono valido, con menos de 14 digitos";
            tel.classList.add('is-invalid');
        };

        //Validaciones para el campo msg, para que el usuario ingrese algun mensaje
        if (msg.value == "") {
            errores.msg = "Tienes que ingresar un mensaje";
            msg.classList.add('is-invalid');
        };

        //Si hay un error o mas, se agrega el mensaje de error debajo del input correspondiente
        if (Object.keys(errores).length >= 1) {
            erName.innerText = (errores.name) ? errores.name : ' ';
            erEmail.innerText = (errores.email) ? errores.email : ' ';
            erTel.innerText = (errores.tel) ? errores.tel : ' ';
            erMsg.innerText = (errores.msg) ? errores.msg : ' ';

        } else {
            //URL de la API jsonplaceholder
            const APIURL = "https://jsonplaceholder.typicode.com/posts";

            //Informacion para enviar por POST a la API 
            const infoPost = {name: name.value, email: email.value, tel: tel.value, msg: msg.value};

            //Llamado AJAX, donde envio la informacion que ingresa el usuario, y muestra una alerta si el llamado fue exitoso
            $.ajax({
                method: "POST",
                url: APIURL,
                data: infoPost,
                success: function(response){
                    e.preventDefault();
                    Swal.fire({
                        icon: 'success',
                        title: '¡Su mensaje se ha enviado exitosamente!',
                        text: 'Gracias ' + response.name + ', lo contactaremos a la brevedad',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    //Limpia el value de los inputs, y le borra las clases
                    setTimeout(function() {  

                    name.classList.remove('is-valid');
                    name.value = "";

                    email.classList.remove('is-valid');
                    email.value = "";

                    tel.classList.remove('is-valid');
                    tel.value = "";

                    msg.classList.remove('is-valid');
                    msg.value = "";

                    }, 2000);
                }
            })
        }
    })
});