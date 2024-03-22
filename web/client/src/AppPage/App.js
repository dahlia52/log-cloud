import { Calendar, CameraButton, Navigation } from './AppComponents';
import './App.css'
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function App() {

    return (
        <div className="app-page">
            <Link to={'/'}>
                <h1>log your memory</h1>
            </Link>

            <Calendar />
            <CameraButton />

            <Navigation />
        </div>
    )
}

export default App