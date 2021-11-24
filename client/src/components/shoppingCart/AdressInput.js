import React, {useState} from 'react'
import Placeholderdata from './placeholderData.json'

export default function AdressInput({id}) {
    const [userData] = useState(Placeholderdata.user);

    const userAdress = (props)=>{
        let userAdress = userData.find((user) => props === user.id);

        if(userAdress){
            return userAdress.adress;
        }else{
            return " "
        }
    }

    const userCity = (props)=>{
        let userCity = userData.find((user) => props === user.id);

        if(userCity){
            return userCity.city;
        }else{
            return " "
        }
    }

    const [adress, setAdress] = useState(userAdress(id));
    const [city, setCity] = useState(userCity(id));     

     return (
        <div>
            <h2>Adress</h2>
            <input type="text"
            placeholder = {adress}
            onChange={(event)=>{
                setAdress(event.target.value);
            }}/>
            <h2>City</h2>
            <input type="text"
            placeholder = {city}
            onChange={(event)=>{
                setCity(event.target.value);
            }}/>
        </div>
    )
}
