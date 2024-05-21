const form = document.querySelector('form');
const fullName = document.getElementById("navn");
const email = document.getElementById("email");
const phone = document.getElementById("telefon");
const subject = document.getElementById("emne");
const mess = document.getElementById("besked");

function sendEmail() {
    const bodyMessage = `Full name: ${fullName.value}<br> Email:${email.value}<br> Phone number: ${phone.value}<br> Message: ${mess.value}`;

    Email.send({
        SecureToken: "162eb5d6-faef-4f26-bc6e-f59e6153d2b3 ", 
        To : 'op7486684@gmail.com',
        From : "op7486684@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Success!",
                text: "Besked sendt!",
                icon: "success"
              });
        }
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }


        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => { 
            checkEmail();
        })


        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}


function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Indtast en korrekt email adresse"
        }
        else {
        errorTxtEmail.innerText = "Email kan ikke være blank";
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")) {

        sendEmail();

        form.reset();
        return false;
    }

    
});

