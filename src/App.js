import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai'; 
import Navigation from './components/navigation/navigation';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';
import FaceRecognition from './components/faceRecognition/faceRecognition';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import './App.css';
import React, { Component } from 'react';


const app = new Clarifai.App({
  apiKey: '348067f3d03f408fba3df5bc04ce73d0'
 });


class App extends Component  {
  constructor(){
    super();
    this.state = {
      input :'',
      imageUrl:'',
      box : {},
      route: 'signin',
      isSignedIn: false,
    }
  };
  componentDidMount(){
    fetch('http://localhost:3001')
    .then(response=>response.json())
    .then(console.log)
  }
  CalculateFaceLocation =(data)=> {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width) ;
    const height = Number(image.height); 
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width- (clarifaiFace.right_col*width),
      bottomRow: height -(clarifaiFace.bottom_row*height),
    }

  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onInputChange =(event)=>{
this.setState({input: event.target.value});

  }

  onButtonSubmit =()=> {
    this.setState({imageUrl: this.state.input}) ;
    app.models.predict(
     {
          id: 'face-detection',
          name: 'face-detection',
          version: '6dc7e46bc9124c5c8824be4822abe105',
          type: 'visual-detector',
        },
      this.state.input)
      .then(response => this.displayFaceBox(this.CalculateFaceLocation (response)))
      .catch(err=> console.log(err));
};

onRouteChange = (route)=>{
  if(route === 'signout'){
    this.setState({isSignedIn:false})
  } else if (route==='home') {
    this.setState({isSignedIn:true})
  }
  this.setState({route:route})
}


  render(){

    const {isSignedIn, box, imageUrl, route} = this.state;
    return (
        <div className="App">
          <ParticlesBg   num={200} type="cobweb" bg={true} />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home' 

            ?  <div> 
                <Logo/>
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition box= {box} imageUrl={imageUrl}/> 
              </div>
            : (
              route === 'signin' 
              ? <SignIn onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/>
            )
            
       
        }
        </div> 
    );
    
  
};
};
export default App;
