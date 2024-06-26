import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Signup.css'

function SignupPage() {
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const navigate = useNavigate();

    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSetUsername = (e) => {
        setUsername(e.target.value);
        setIsUsernameAvailable(false); // reset availability status if value is changed
    };

    const handleSetPassword1 = (e) => {
        setPassword1(e.target.value);
    };

    const handleSetPassword2 = (e) => {
        setPassword2(e.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSignup();
        }
    }

    const handleCheckAvailability = async() => {
        console.log(username);
        const response = await fetch(`/username_availability?username=${username}`);
        const data = await response.json();
        console.log(data);
        if (data.available === true) {
            setIsUsernameAvailable(true);
            alert("Username available!");
        } else {
            alert("Unavailable username");
        }
    };

    const handleSignup = async() => {
        if (!username || !email || !password1 || !password2) {
            alert("All fields are mandatory");
            return;
        }

        if (username.length < 3) {
            alert("Choose a longer username");
            return;
        }

        const reservedUsername = ['username','email','temp']
        if (reservedUsername.includes(username)) {
            alert("Please choose a different username");
            return;
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Email invalid");
            return;
        }

        if (password1.length < 4) {
            alert("Password must be longer than 3 characters");
            return;
        }

        if (password1 !== password2) {
            alert("Passwords do not match");
            return;
        }

        if (!isUsernameAvailable) {
            alert("Check username availability");
            return;
        }

        const pattern = /^[A-Za-z0-9']+$/;
        if (pattern.test(username) && pattern.test(password1)) {
            try {
                const response = await fetch('/registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: username, email: email, password: password1 }),
                });

                if (response.ok) {
                    navigate("/login");
                } else {
                    alert('Sign Up failed :(');
                }
            } catch (error) {
                console.error('Error signing up:', error);
            }
        }
        else {
            alert("Make sure username and password only contains letters and numbers");
        }

    };


    return (
        <div className="signup-page">
        <AnimatePresence mode='wait'>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, when: "afterChildren" }}
            transition={{ duration: 0.5 }}
            >

            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <h1>log your memory</h1>
            </Link>

            <div className='signup-box'>
                <h2>Create Account</h2>

                <div className='text-box'>
                    <div className='signup-label'>Email</div>
                    <input value={email} onChange={(e) => handleSetEmail(e)} className='signup-textinput'></input>
                </div>

                <div className='text-box'>
                    <div className='signup-label'>username</div>
                    <input value={username} onChange={(e) => handleSetUsername(e)} className='signup-textinput'></input>
                    <div className='check-username' onClick={handleCheckAvailability}>check</div>
                </div>

                <div className='text-box'>
                    <div className='signup-label'>password</div>
                    <input type="password" value={password1} onChange={(e) => handleSetPassword1(e)} className='signup-textinput'></input>
                </div>

                <div className='text-box'>
                    <div className='signup-label confirm-password'>confirm<br/>password</div>
                    <input type="password" value={password2} onKeyDown={handleKeyDown} onChange={(e) => handleSetPassword2(e)} className='signup-textinput'></input>
                </div>
                
                <SignupButton  handleSignup={handleSignup} />
            </div>
            </motion.div>
        </AnimatePresence>
        </div>
    )
}

function SignupButton({ handleSignup }) {
    return (
        <div className="signup-button">
            <div onClick={handleSignup} className="signup-link">
                <div>SIGN UP</div>
            </div>
        </div>
    )
}

export default SignupPage