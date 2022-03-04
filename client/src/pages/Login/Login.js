import {useState, React} from 'react';

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event){
    event.preventDefault()

// validate input

const userphone = document.getElementById("phone");
const userpassword = document.getElementById("password");

    // Get Input values
    const phoneValue = userphone.value.trim();
    const passwordValue = userpassword.value.trim();
    
    //Phone checking...
    if(phoneValue === ""){
        setErrorFor(userphone , "Number Can't be Blank");
    }
    // else if (!isPhone(phoneValue)){
    //     setErrorFor(userphone , "Phone Number is not valid");  
    // }
    else {
        setSuccessFor(userphone);
    }


    //password checking...
    if(passwordValue === ""){
        setErrorFor(userpassword , "Password Can't be Blank");
        return -1
    }
    else {
        setSuccessFor(userpassword);
    }


//show error && add error class
function setErrorFor(inputElement,errorMessage){
    const formControl = inputElement.parentElement ; //.form-control
    const small = formControl.querySelector("small"); //small tag
    small.innerText = errorMessage;//add error message in small tag
    formControl.className = "form-control error" //add error class (we can use .add() instead)

}

//add success class 
function setSuccessFor(inputElement){
    const formControl = inputElement.parentElement ; //.form-control
    formControl.className = "form-control success" //add success class (we can use .add() instead)
}

// //check for valid phone number
// function isPhone(phoneevaluate){
//     regularexpression = "use some regular expressions"
//     return regularexpression.test(phoneevaluate)
// }


// ______________________________________________________________________

    const response = await fetch("http://localhost:1234/api/login",{
      method: "POST" ,
      headers:{
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
        phone,
        password
      }),
    })

    const data = await response.json()

    if(data.token){
      localStorage.setItem("token",data.token)
      alert("Login Success");
      window.location.href="/profile"
    }
    if(!data.token){
      localStorage.removeItem("token")
      setErrorFor(userphone,"Check Phone Number")
      setErrorFor(userpassword,"Invalid User check Password")
    }

  }

  const goToRegister = function(){
    window.location.href="/register"
  }

  return (
    <div className='container'>
      <div className='header'>
        <h2>Login</h2>
      </div>
      <form className="form" id="form" onSubmit={loginUser}>
        
        <div className="form-control">
          <label htmlFor="phone">Phone</label>
          <input type="tel" 
              id="phone"
              placeholder="9876543210"
              pattern="^[6-9]{1}[0-9]{9}$"
              value = {phone}
              onChange = {(e) => setPhone(e.target.value)}
              />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error Message</small>
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" 
              id="password"
              placeholder="Password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
              />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error Message</small>
        </div>

        <input type="submit" value="Login" />

        <button onClick={goToRegister}>Register</button>

      </form>
    </div>
  );
}

export default Login;
