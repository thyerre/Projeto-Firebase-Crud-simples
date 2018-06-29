firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("card-login").style.display ="none";
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";

      var user = firebase.auth().currentUser;

      if(user != null){
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = "Bem Vindo: " + email_id;
      }
    } else {
      // No user is signed in.
      document.getElementById("card-login").style.display ="block";
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
    }
  });

function login(){
    
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("Error: " + errorMessage)
      });
}

function logout(){
    firebase.auth().signOut();
    window.location.replace("index.html");
}

function create_account(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        window.alert("Error: " + errorMessage);
        
      });
}

function CadastrarDespesa(){
    var description = document.getElementById("description").value;
    var amount = document.getElementById("amount").value;
    var dateAdd = document.getElementById("dateAdd").value;
    var despesas = {amount:amount,description:description,dateAdd:dateAdd};
    
    if(db.database().ref('minhasdespesas').push(despesas)){
        $("button.button").notify("Despesa adicionada","success");
    }

}
