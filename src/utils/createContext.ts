import React from 'react';

interface CreateContextProps {
  name?: string;
}

const message = 'useContext must be inside a Provider with a value';

export function createContext<T>({
  name,
}: CreateContextProps): [React.Provider<T>, () => T, React.Context<T>] {
  let Context = React.createContext<T>({} as T);
  Context.displayName = name;

  const useContext = () => {
    const context = React.useContext<T>(Context);
    if (!context) throw new Error(message);
    return context;
  };

  return [Context.Provider, useContext, Context];
}
