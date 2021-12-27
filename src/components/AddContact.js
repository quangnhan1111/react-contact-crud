import React, {useRef, useState} from "react";
import {useGlobalContext} from "../context/context";

function AddContact(props) {
    const {showAlert, addContactHandler } = useGlobalContext()
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    function add(e) {
        e.preventDefault();
        if (name === "" || email === "") {
            // this.props.showAlert(true, 'success', 'ALl the fields are mandatory!');
            showAlert(true, 'success', 'ALl the fields are mandatory!');
            return;
        }
        const person = { name, email };
        console.log(person);
        // this.props.addContactHandler(this.state);
        addContactHandler(person);
        setName("")
        setEmail("")
        // this.props.history.push("/");// dung trong class
        props.history.push("/");// dung trong function
    };
    return (

        <div className="ui main">
            {/*{alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}*/}
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={add}>
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
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
}

export default AddContact;
