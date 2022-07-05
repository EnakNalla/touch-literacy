import { enableStaticRendering } from 'mobx-react-lite';
import { Context, createContext, ReactNode, useContext } from 'react';
import Store from './store';

enableStaticRendering(typeof window === 'undefined');

let StoreContext: Context<Store>;
let store: Store;
const initStore = () => {
  let _store = store ?? new Store();

  if (typeof window !== 'undefined' && !store) store = _store;

  return _store;
};

interface Props {
  children: ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const _store = initStore();
  StoreContext = createContext(_store);

  return <StoreContext.Provider value={_store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;

export const useStore = () => useContext(StoreContext);
