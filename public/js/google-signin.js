console.log('ciao')
    // document.getElementById("myForm").submit();




document.querySelector("#google-signin-button").addEventListener("click", function(e) {
    e.preventDefault()
    console.log('click')
    const google_signin_form = document.querySelector("#google-signin-form");
    console.log(google_signin_form)
    google_signin_form.submit();
});