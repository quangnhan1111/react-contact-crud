import React, {useEffect, useState} from "react";
import {useGlobalContext} from "../context/context";

function EditContact (props) {
    const {showAlert, updateContactHandler } = useGlobalContext()

    useEffect(()=>{
        console.log(props)
    },[])

    const [id, setId] = useState(props.location.state.contact.id);
    const [email, setEmail] = useState(props.location.state.contact.email);
    const [name, setName] = useState(props.location.state.contact.name);

    function update(e) {
        e.preventDefault();
        if (name === "" || email === "") {
            showAlert(true, 'success', 'ALl the fields are mandatory!');
            return;
        }
        const person = { id, name, email };
        console.log(person);
        updateContactHandler(person)
        setName("")
        setEmail("")
        props.history.push("/");
    };
    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
}

export default EditContact;
