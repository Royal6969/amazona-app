import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SigninScreen(){ //min 5:02:50 no me salen los cuadros de input para escribir el email/password
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: signin action
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <imput 
                        type="email" 
                        id="email" 
                        placeholder="Enter email" 
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></imput>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <imput 
                        type="password" 
                        id="password" 
                        placeholder="Enter password" 
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></imput>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Sign In
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? {' '}<Link to="/register">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}