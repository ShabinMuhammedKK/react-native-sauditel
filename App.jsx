import React from 'react';
import Navigation from './navigation/navigation.jsx';
import {UserProvider} from './store/userContext.js';

const App = () => {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

export default App;
