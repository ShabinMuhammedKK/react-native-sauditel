import {createContext, useContext, useReducer} from 'react';
import {initialState, userReducer} from './userReducer';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('context data not available');
  }
  return context;
};
