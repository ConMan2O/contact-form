document.getElementById("contact-form").onsubmit = () => {
    
    let isValid = true;

    clearErrors();

    let fname = document.getElementById("first").value.trim();
    if(fname === ""){
        document.getElementById("first-error").style.display = "block";
        isValid = false;
    }

    let lname = document.getElementById("last").value.trim();
    if(lname === ""){
        document.getElementById("last-error").style.display = "block";
        isValid = false;
    }

    // optional email, but if provided, must be valid
    let email = document.getElementById("email").value.trim();
    if(email != "" && (!email.includes("@") || !email.includes("."))){
        document.getElementById("email-error").style.display = "block";
        isValid = false;
    }

    // If mailing list is selected, make email required
    let mail = document.getElementById("mailing");

    if(mail.checked && email === ""){
        document.getElementById("mailing-error").style.display = "block";
        isValid = false;
    }

    // LinkedIn address is optional, but must start with "https://linkedin.com/in/"
    let linkedin = document.getElementById("linkedin").value.trim();
    if(linkedin != "" && (!linkedin.includes("https://linkedin.com/in/"))){
        document.getElementById("linkedin-error").style.display = "block";
        isValid = false;
    }

    let meet = document.getElementById("meet").value;
    if (meet === "none"){
        document.getElementById("meet-error").style.display = "block";
        isValid = false;
    }
    else if(meet==="Other"){
        document.getElementById("met").style.display = "block";
    }




    return isValid;   
    
};

function clearErrors(){
   
    let errors = document.getElementsByClassName("error")
    for (let i=0; i<errors.length; i++){
        errors[i].style.display = "none";
    }

}