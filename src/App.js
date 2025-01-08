import React from 'react';
import EmojiGallery from './components/EmojiGallery';
import Logo from './components/Logo';
import './App.css';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <header>
        <Logo />
        <p>Download high-quality emoji PNGs with transparent backgrounds</p>
      </header>
      <EmojiGallery />
    </div>
  );
}

export default App; 
