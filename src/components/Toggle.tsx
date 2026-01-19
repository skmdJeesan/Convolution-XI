import React from 'react'
import '../app/login/login.css'
// import { useClickSound } from '@/hooks/useClickSound';

function Toggle({active, setActive}: {active: boolean, setActive: React.Dispatch<React.SetStateAction<boolean>>}) {
  //const playClick = useClickSound('/click.mp3');
  
  const handleToggle = (newState: boolean) => {
    // playClick();
    setActive(newState);
  };
  
  return (
    <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button type="button" id="login"
            onClick={() => handleToggle(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button type="button" id="register" 
              onClick={() => handleToggle(true)}>Register</button>
          </div>
        </div>
      </div>
  )
}

export default Toggle