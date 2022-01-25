import React, { Component} from "react";
import logo from './icons/logo.svg';
import './css/App.css';
import Header from './components/Header';
import Body from './components/Body';

class App extends Component{
    render(){
        return (
            <div className="App">
                <Header/>
                <Body/>
            </div>
        );
    }
}

export default App;