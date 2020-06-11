import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    email: yup.string().email("Must be a valid email address.").required("Must include email address."),
    password: yup.string().min(8, "Passwords must be at least 8 characters long.").required("Password is Required"),
    terms: yup.boolean().oneOf([true], "You must accept Terms and Conditions")
});

export default function Form() {
    const [buttonStop, setButtonStop] = useState(true);

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const [user, setUser] = useState([])
 const addNewUser = element => {
   const newUser = {
     id: Date.now(),
     name: element.name,
     email: element.email,
     password: element.password
   };

   setUser([...user, newUser])
 }

    

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonStop(!valid);
        });
    }, [formState]);

    const formSubmit = event => {
        event.preventDefault();
        axios
        .post("https://reqres.in/api/users", formState)
        
        .then(res => {
            console.log("post", formState);
            addNewUser(res.data);
            
        setFormState({
            name: "",
            email: "",
            password: "",
            terms: ""
        });
        })
        .catch(error => console.log(error.response));
    };

    const validateChange = event => {
        yup.reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(valid => {
            setErrors({
                ...errors, [event.target.name]: ""
            });
        })
        .catch(err => {
            setErrors({
                ...errors, [event.target.name]: err.errors[0]
            });
        });
    };

    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formState, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        };

        validateChange(event);
        setFormState(newFormData)
    };

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input
                type="text"
                name="name"
                value={formState.name}
                onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor="email">
                Email
                <input
                type="text"
                name="email"
                value={formState.email}
                onChange={inputChange}
                />
                {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
            </label>
            <label htmlFor="password">
                Password
                <input
                type="password"
                name="password"
                value={formState.password}
                onChange={inputChange}
                />
                {errors.password.length > 0 ? (
                    <p className="error">{errors.password}</p>) : null}
            </label>
            <label htmlFor="terms" className="terms">
                <input
                type="checkbox"
                name="terms"
                checked={formState.terms}
                onChange={inputChange}
                />
                Terms of Service
            </label>
            <button disabled={buttonStop}>Submit</button>
            {user.map((e) => (<div key={e.id}>
                <h2>name {e.name}</h2>
                <h2>email {e.email}</h2>
                <h3>password {e.password}</h3>
                
            </div>))}
        </form>
    );
}