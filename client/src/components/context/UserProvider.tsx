// // גירסה אחרי פסח עובד 
// import React, { createContext, useReducer, ReactNode } from 'react';
// import reducerUsers, { Action, User } from '../user/reducer/reducerUsers';

// interface UserContextProps {
//   state: User;
//   dispatch: React.Dispatch<Action>;
// }

// export const initialState: User = {
//   id: 0,
//   // firstName: "",
//   // lastName: "",
//   name: "",
//   email: "",
//   password: "",
//   // address: "",
//   // phone: ""
// };

// export const UsersContext = createContext<UserContextProps | undefined>(undefined);

// interface UserProviderProps {
//   children: ReactNode;
// }

// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [state, dispatch] = useReducer(reducerUsers, initialState);

//   return (
//     <UsersContext value={{ state, dispatch }}>
//       {children}
//     </UsersContext>
//   );
// };


// גירסה ב cloud

import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import reducerUsers, { Action, User } from '../user/reducer/reducerUsers';

interface UserContextProps {
  state: User;
  dispatch: React.Dispatch<Action>;
}

export const initialState: User = {
  id: 0,
  name: "",
  email: "",
  password: "",
};

export const UsersContext = createContext<UserContextProps | undefined>(undefined);

// Custom hook for easier context usage
export const useUserContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducerUsers, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};