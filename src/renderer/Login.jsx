import React from "react";
import { Link, hashHistory } from "react-router";
import Errors from "./Errors";
import firebase from "firebase/firebase-browser";

const SIGNUP_FORM_STYLE = {
    margin: "0, auto",    
    padding: 30
};

const CANCEL_BUTTON_STYLE = {
    marginLeft: 10
};

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:  localStorage.userEmail || "",
            password: localStorage.userPassword || "",
            errors: []
        };

        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this);
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);        
    }

    handleOnChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleOnChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleOnSubmit(e) {
        const { email, password, name, photoURL } = this.state;
        const errors = [];
        let isValid = true;
        e.preventDefault();

        if (!email.length) {
            isValid = false;
            errors.push("Email address can't be blank.");
        }

        if (!password.length) {
            isValid = false;
            errors.push("Password can't be blank.");
        }
        
        if (!isValid) {
            this.setState({ errors });
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            localStorage.userEmail = email;
            ocalStorage.userPassword = password;
            hashHistory.push("/rooms");
        }).catch(() => {
            this.setState({ errors: ["Incorrect email or password."] });
        });
    }

    render() {
        return (
            <form style={SIGNUP_FORM_STYLE} onSubmit={this.handleOnSubmit}>
                <Errors errorMessages={this.state.errors} />
                <div className="form-group">
                    <label>Email address*</label>
                    <input 
                        type="email"
                        className="form-control"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.handleOnChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.handleOnChangePassword}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-large btn-primary">Create new account</button>
                    <Link to="/login">
                        <button type="button" style={CANCEL_BUTTON_STYLE} className="btn btn-large btn-default">Cancel</button>                
                    </Link>                    
                </div>
            </form>

        );
    }
}