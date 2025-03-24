import React, { createContext, useReducer, ReactNode } from 'react';
import reducerUsers, { Action, User } from '../user/reducer/reducerUsers';

interface UserContextProps {
  state: User;
  dispatch: React.Dispatch<Action>;
}

export const initialState: User = {
  id: 0,
  // firstName: "",
  // lastName: "",
  name: "",
  email: "",
  password: "",
  // address: "",
  // phone: ""
};

export const UsersContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducerUsers, initialState);

  return (
    <UsersContext value={{ state, dispatch }}>
      {children}
    </UsersContext>
  );
};
