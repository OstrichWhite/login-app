import {useState,React } from 'react';
import {useNavigate} from "react-router-dom"

function Register() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate=useNavigate();

  async function registerUser(event){
    event.preventDefault()

    // Validate Input
// _____________________________________________________________________________


const username = document.getElementById("name");
const userdob = document.getElementById("dob");
const usergender = document.getElementById("gender");
const useremail = document.getElementById("email");
const userphone = document.getElementById("phone");
const userpassword = document.getElementById("password");
const userpassword2 = document.getElementById("password2");




    // Get Input values
    const usernameValue = username.value.trim();
    const userdobValue = userdob.value.trim();
    const usergenderValue = usergender.value.trim();
    const emailValue = useremail.value.trim();
    const phoneValue = userphone.value.trim();
    const passwordValue = userpassword.value.trim();
    const password2Value = userpassword2.value.trim();


    //name checking...
    if(usernameValue === ""){
        setErrorFor(username , "User Name Can't be Blank");
    }
    else {
        setSuccessFor(username);
    }
    
    //dob checking...
    if(userdobValue === ""){
        setErrorFor(userdob , "Date of Birth Can't be Blank");
    }
    else {
      setSuccessFor(userdob);
    }

    //gender checking...
    if(usergenderValue === ""){
        setErrorFor(usergender , "Choose the gender");
    }
    else {
      setSuccessFor(usergender);
    }

    //Email checking...
    if(emailValue === ""){
        setErrorFor(useremail , "Email Can't be Blank");
    }
    // else if (!isEmail(emailValue)){
    //     setErrorFor(useremail , "Email is not valid");  
    // }
    else {
        setSuccessFor(useremail);
    }

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
    }
    else {
        setSuccessFor(userpassword);
    }


    //password2 checking...
    if(password2Value === ""){
        setErrorFor(userpassword2 , "Please Enter the Confirm Password");
    }
    else if(passwordValue !== password2Value){
        setErrorFor(userpassword2 , "Password does not Match")
        return -1
    }
    else {
        setSuccessFor(userpassword2);
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

// //check for valid mail id
// function isEmail(emailevaluate){
//     regularexpression = "use some regular expressions"
//     return regularexpression.test(emailevaluate)
// }
// //check for valid phone number
// function isPhone(phoneevaluate){
//     regularexpression = "use some regular expressions"
//     return regularexpression.test(phoneevaluate)
// }





// ______________________________________________________________________________________



    // Register User
    const response = await fetch("http://localhost:1234/api/register",{
      method: "POST" ,
      headers:{
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
        name,
        dob,
        gender,
        email,
        phone,
        password
      }),
    })

    const data = await response.json()

    if(data.status === "ok"){
      navigate("/login")
    }
    if(data.status === "error"){
      setErrorFor(userphone,data.error)
    }
  }

  const goToLogin = function(){
    window.location.href="/login"

  }


  return (
    <div className='container'>
      <div className='header'>
        <h2>Register</h2>
      </div>
      <form className="form" id="form" onSubmit={registerUser}>
        
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" 
              id="name"
              placeholder="Abdul_Rahim"
              value = {name}
              onChange = {(e) => setName(e.target.value)}
              />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error Message</small>
        </div>

        <div className="form-control">
          <label htmlFor="dob">DOB</label>
          <input type="date" 
              id="dob"
              placeholder="27/10/2000"
              value = {dob}
              onChange = {(e) => setDob(e.target.value)}
              />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error Message</small>
        </div>

        <div className="form-control">
          <label htmlFor="gender">Gender</label>
          <select
              id="gender"
              placeholder="Male/Female" 
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>


          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error Message</small>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" 
              id="email"
              placeholder="Abdul_Rahim@gmail.com"
              // name="email"
              value = {email}
              onChange = {(e) => setEmail(e.target.value)}
              />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error Message</small>
        </div>

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
              // name="password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
              />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error Message</small>
        </div>

        <div className="form-control">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" 
              id="password2"
              placeholder="Re Enter Password"
              // name="password2"
              value = {password2}
              onChange = {(e) => setPassword2(e.target.value)}
              />
          <i className="fas fa-check-circle"></i>
          <i className="fas fa-exclamation-circle"></i>
          <small>Error Message</small>
        </div>

        <input type="submit" value="Register" />

        <button onClick={goToLogin}>Login</button>

      </form>
    </div>
  );
}

export default Register;
