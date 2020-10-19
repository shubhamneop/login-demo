import React from 'react';
import {Background} from 'react-imgix';

export const HeroImage = () => (
    <Background
    src="https://assets.imgix.net/tutorials/forest4.webp"
    className="hero-image"
  >
    <h2>Responsive Image Gallery with React and imgix</h2>
  </Background>
);