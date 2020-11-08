import React, { useEffect } from 'react';
import ReactDom from 'react-dom';

import { Home } from './views/Home';

import './_sass/styles.scss'

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {

  useEffect(() => { }, [
    document.title = "Sub Size Me"
  ])

  return <Home />
}

ReactDom.render(<App />, mainElement);
