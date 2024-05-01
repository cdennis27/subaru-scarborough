/* GENERAL VARIABLES */

const screenWidth = window.screen.width;
const innerWidth = window.innerWidth;



/* NAVBAR VARIABLES */

const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbar = document.getElementsByClassName('navbar')[0]
const menuButton = document.querySelector('.menuButton')

/* FORM VARIABLES */

const name = document.getElementById('name')
const email = document.getElementById('email')
const address = document.getElementById('address')
const phone = document.getElementById('phone')

var ServicesItem = document.getElementsByClassName('servicesItem')

var servicesList;
var servicesOption = [];

const message = document.getElementById('message')

const errorElement = document.getElementById('error')

/* video loop class */
document.querySelector('video').addEventListener('timeupdate', function(e) {
    if (innerWidth < 500) {
        return;
    }
    if(e.target.duration - e.target.currentTime <= 1) {
        e.target.currentTime = 0;
        e.target.play();
    }
}, false);

/* navbar menu for mobile */


toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('active');
    toggleButton.classList.toggle('close');
    menuButton.classList.toggle('close');
    console.log(menuButton.classList);
    const isOpened = menuButton.getAttribute('aria-expanded');
    if (isOpened === 'false') {
        menuButton.setAttribute('aria-expanded', 'true');
        toggleButton.setAttribute('aria-expanded', 'true');
    }
    else {
        menuButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-expanded', 'false');
    }
});

/* function for contact form */

function sendMail() {

    console.log("email info: " + name.value, email.value, address.value, message.value, phone.value, servicesOption.value)


    for (var i = 0; i < ServicesItem.length; i++) {

        console.log(ServicesItem[i].value);
        if (ServicesItem[i].type == 'checkbox' && ServicesItem[i].checked == true) {
            servicesOption.push(ServicesItem[i].value);
        }
        console.log(servicesOption);
    }
    console.log(servicesOption.join(", "));
    servicesList = servicesOption.join(", ");
    console.log(servicesList);
    debugger;

    if (email.value === "" || name.value === "" || message.value === "") {
        errorElement.innerText = ("Please fill out all fields")
        return
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
        console.log("email is invalid")

        errorElement.innerText = ("Please enter a valid email address")
        alert("Please enter a valid email address, form will be reset.")
        return
    }

    if (address.value === "") {
        errorElement.innerText = ("Please enter your address")
        address.value = "no location given by customer!"
    }

    if (phone.value === "") {
        errorElement.innerText = ("Please enter your phone number")
        alert("Please enter a valid phone number, form will be reset.")
        return
    }

    if (servicesList === "") {
        errorElement.innerText = ("Please select at least one service")
        alert("Please enter at least one service, form will be reset.")
        return
    }




    let params = {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: phone.value,        
        servicesList: servicesList,        
        message: message.value

    }
    console.log(params)
    console.log(params.name, params.email, params.address, params.phone, params.servicesList, params.message)

    emailjs.send("service_9u8shmd", "template_u6xztwqjg89e5th", params).then(alert("Email Sent!!!"))
    console.log(params)


    console.log(params.name, params.email, params.address, params.phone, params.servicesList, params.message);


}
/* no AutoPlay on Mobile */
function noAutoplay() {
    console.log("Function screen:" + screenWidth, "inner:" + innerWidth);
    //debugger;
    if (innerWidth < 500) {
        document.getElementById("video").removeAttribute('autoplay');
        
    }
    if (innerWidth < 500) {
        document.getElementById("video2").removeAttribute('autoplay');
        return;
    }

    if (screenWidth < 768) {
        document.getElementById("video").removeAttribute('autoplay');
        return;
    }
    
}


noAutoplay();














