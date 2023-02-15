import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai'; 
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import './App.css';
import React, { Component } from 'react';


const app = new Clarifai.App({
  apiKey: 'fb7ecea1b11a4d819d15a7d97baa312c'
 });


class App extends Component  {
  constructor(){
    super();
    this.state = {
      input :'',
    }
  }

  onInputChange =(event)=>{
console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log ("Click");
    app.models.predict(
      {
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
        }, "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
    ).then(
      function(response){
        console.log("response");
      },
      function(err){
        console.log("err");
      
      }
    );

};
  render(){

  
    return (
        <div className="App">
          <ParticlesBg   num={200} type="cobweb" bg={true} />
          <Navigation/>
          <Logo/>
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          
          {/* <FaceRecognition/> */}
        </div>
    )
    
  
};
};
export default App;
