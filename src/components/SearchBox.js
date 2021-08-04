import React, { useState } from 'react';
//in this component we don't search, we just redirect the user to the search page
export default function SearchBox(props) { 
    const [name, setName] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);
    };
    return (
        <form className="search" onSubmit={submitHandler}>
            <div className="row">
                <input 
                    type="text" 
                    name="q" 
                    id="q" 
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <button className="primary" type="submit">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    )
}