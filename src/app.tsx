import React, { useEffect } from 'react';
import ReactDom from 'react-dom';

import { Principal } from './views/Principal';
import { WindowBar } from './componets/WindowBar'

import './_sass/styles.scss'


const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {

  useEffect(() => { }, [
    document.title = "Sub Size Me"
  ])

  return(
    <>
      <WindowBar />
      <Principal />
    </>
  )
}

ReactDom.render(<App />, mainElement);
