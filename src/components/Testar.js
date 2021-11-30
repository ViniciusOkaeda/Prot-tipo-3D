import React, { useEffect, useState} from 'react';
import './index.css';



export default function Testar() {

    const getTheme  = () => {
        return JSON.parse(localStorage.getItem("theme")) || false
    }

    const [theme, setTheme] = useState(getTheme());

    useEffect (() => {
        localStorage.setItem("theme", JSON.stringify(theme))
    }, [theme])

    return (
        <div className={theme ? "theme-dark": ""}>
            <div className="content-bg-color main-content">
                <h1>Dark Mode is</h1>
                <input type="checkbox" onChange={() => setTheme(!theme)} checked={theme ? "true": ""} />
            </div>
        </div>

    );
  }