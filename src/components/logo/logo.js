import React from 'react';
import Tilt from 'react-parallax-tilt';
import './logo.css';
import brain from './brain.png';

const Logo = ()=> {
    return (
       <div className='ma4 mt0' >
        <Tilt className='Tilt br2 shadow-2' style={{height: '150px', width: '150px'}}>
      <div style={{ height: '150px', }}>
        <h1 className='Tilt pa3'> <img style={{paddingTop:'5px', height: '80%', width: '80%'}}src={brain} alt='logo '/></h1>
      </div>
    </Tilt>

       </div>

    )
}

export default Logo;
