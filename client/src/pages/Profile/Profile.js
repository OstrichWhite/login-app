import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"


const Profile = ()=>{

    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");


    const navigate=useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            getTokenData()
        }
        else{
            navigate("/")
        }
    })


    async function getTokenData(){

        const response = await fetch("http://localhost:1234/api/profile",{
            headers:{
                'x-access-token': localStorage.getItem('token')
            }
        })
        const data = await response.json()

        if(data.status === "ok"){
            setName(data.user.name)
            setDob(data.user.dob)
            setGender(data.user.gender)
            setEmail(data.user.email)
            setPhone(data.user.phone)
        }
        if(data.status === "error"){
            alert("Invalid Token")
            navigate("/")
        }
    }




    /**
     * I have token in local storage 
     * send token to server by header and check
     * server la token decode panni phone no eduthu user ah db la irunthu get panni atha resposnse pannanum
     * 
     * 
     * incase token illa redirect pannanum token thappa irunthalum 
     */

     const logOut = function(){
        localStorage.removeItem("token")
        window.location.href="/"
    
      }
    

    return(
        <div className="container">
            <div className="header">
                <h2>Hello Dear {name}</h2>
            </div> 
            <ol>
                <li>{name}</li>
                <li>{dob}</li>
                <li>{gender}</li>
                <li>{email}</li>
                <li>{phone}</li>
            </ol>
            <button onClick={logOut} className="button">Log Out</button>
        </div>
    ) 
        

}

export default Profile
