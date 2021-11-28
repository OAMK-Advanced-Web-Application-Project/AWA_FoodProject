import React, {useState} from 'react'

export default function SetOrderStatus() {
    const[status, setstatus] = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();
        alert('The Order-Status has been changed to ' + status)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="submit"
                value="State_1"
                onClick={(e)=> setstatus("State_1")}/>
            </form>
        </div>
    )
}
