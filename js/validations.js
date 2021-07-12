window.addEventListener("load", function() {
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

    name.addEventListener('blur', function() {
        if (name.value == "") {
            name.classList.add('is-invalid');
            name.classList.remove('is-valid');
            erName.innerText = "Tienes que ingresar un nombre"
        } else if (name.value.length < 2) {
            name.classList.add('is-invalid');
            name.classList.remove('is-valid');
            erName.innerText = "Debes usar 2 caracteres o más"
        } else {
            name.classList.remove('is-invalid');
            name.classList.add('is-valid');
            erName.innerText = ""
        }
    })

    email.addEventListener('blur', function() {
        if (email.value == "") {
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
            erEmail.innerText = "Tienes que ingresar un correo electronico"
        } else if (!email.value.match(mailFormat)) {
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
            erEmail.innerText = "Debes ingresar un formato de correo valido"
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
            erEmail.innerText = ""
        }
    })

    tel.addEventListener('blur', function() {
        if (tel.value == "") {
            tel.classList.add('is-invalid');
            tel.classList.remove('is-valid');
            erTel.innerText = "Tienes que ingresar un número de telefono"
        } else if (tel.value.length < 8) {
            tel.classList.add('is-invalid');
            tel.classList.remove('is-valid');
            erTel.innerText = "Debes ingresar un número de telefono valido, con al menos 8 digitos"
        } else {
            tel.classList.remove('is-invalid');
            tel.classList.add('is-valid');
            erTel.innerText = ""
        }
    })

    msg.addEventListener('blur', function() {
        if (msg.value == "") {
            msg.classList.add('is-invalid');
            msg.classList.remove('is-valid');
            erMsg.innerText = "Tienes que ingresar un mensaje"
        } else {
            msg.classList.remove('is-invalid');
            msg.classList.add('is-valid');
            erMsg.innerText = ""
        }
    })

    buttonSubmit.addEventListener('click', function(e) {
        e.preventDefault()
        let errores = {};

        if (name.value == "") {
            errores.name = "Tienes que ingresar un nombre"
            name.classList.add('is-invalid');
        } else if (name.value.length < 2) {
            errores.name = "Debes usar 2 caracteres o más"
            name.classList.add('is-invalid');
        };

        if (email.value == "") {
            errores.email = "Tienes que ingresar un correo electronico"
            email.classList.add('is-invalid');
        } else if (!email.value.match(mailFormat)) {
            errores.email = "Debes ingresar un formato de correo valido"
            email.classList.add('is-invalid');
        };

        if (tel.value == "") {
            errores.tel = "Tienes que ingresar un número de telefono"
            tel.classList.add('is-invalid');
        } else if (tel.value.length < 8) {
            errores.tel = "Debes ingresar un número de telefono valido, con al menos 8 digitos"
            tel.classList.add('is-invalid');
        };

        if (msg.value == "") {
            errores.msg = "Tienes que ingresar un mensaje"
            msg.classList.add('is-invalid');
        };

        if (Object.keys(errores).length >= 1) {
            erName.innerText = (errores.name) ? errores.name : ' ';
            erEmail.innerText = (errores.email) ? errores.email : ' ';
            erTel.innerText = (errores.tel) ? errores.tel : ' ';
            erMsg.innerText = (errores.msg) ? errores.msg : ' ';

        } else {
            setTimeout(function() { form.submit(); }, 2000);
            Swal.fire({
                icon: 'success',
                title: '¡Su mensaje se ha enviado exitosamente!',
                text: 'Lo contactaremos a la brevedad',
                showConfirmButton: false,
                timer: 2000
            })
        }
    })
})