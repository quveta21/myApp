import React, { useCallback, useEffect, useReducer, createContext } from 'react';
import { ItemProps } from './Item';
import { getItems, createItem, updateItem, newWebSocket } from './itemApi';

// Definim ce informatii va contine seiful
export interface ItemState {
  items: ItemProps[];
  fetching: boolean;
  saving: boolean;
  error?: Error | null;
  saveItem?: (item: ItemProps) => Promise<any>;
}

// Cream Contextul (care va fi accesat de pagini)
export const ItemContext = createContext<ItemState>({
  items: [],
  fetching: false,
  saving: false,
});

// Definim Reducerul (ca un switch care spune cum se modifica starea in functie de actiune)
const reducer = (state: ItemState, action: any): ItemState => {
  switch (action.type) {
    case 'FETCH_STARTED':
      return { ...state, fetching: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, fetching: false, items: action.payload };
    case 'SAVE_STARTED':
      return { ...state, saving: true, error: null };
    case 'SAVE_SUCCESS':
      // Daca am salvat un item cu succes, il actualizam sau il adaugam in lista
      const items = [...state.items];
      const index = items.findIndex(it => it.id === action.payload.id);
      if (index === -1) items.push(action.payload);
      else items[index] = action.payload;
      return { ...state, saving: false, items };
    case 'WS_ITEM_CREATED_OR_UPDATED':
      // Cand serverul trimite notificare prin WS ca a aparut un item nou
      const wsItems = [...state.items];
      const wsIndex = wsItems.findIndex(it => it.id === action.payload.id);
      if (wsIndex === -1) wsItems.push(action.payload);
      else wsItems[wsIndex] = action.payload;
      return { ...state, items: wsItems };
    default:
      return state;
  }
};

// Componenta Provider care inveleste aplicatia
export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    fetching: false,
    saving: false,
  });

  // Efect 1: Cand se incarca aplicatia, aducem toate itemele prin REST
  useEffect(() => {
    dispatch({ type: 'FETCH_STARTED' });
    getItems()
      .then(items => dispatch({ type: 'FETCH_SUCCESS', payload: items }))
      .catch(error => console.error(error));
  }, []);

  // Efect 2: Ne conectam la WebSockets pentru a primi itemele generate deja
  useEffect(() => {
    const ws = newWebSocket((message) => {
      // Serverul trimite mesaje de forma { event: 'created', payload: { item } }
      if (message.event === 'created' || message.event === 'updated') {
        dispatch({ type: 'WS_ITEM_CREATED_OR_UPDATED', payload: message.payload.item });
      }
    });
    return () => ws.close(); // Inchidem conexiunea cand iesim
  }, []);

  // Functia prin care componenta de editare poate salva date
  const saveItem = useCallback(async (item: ItemProps) => {
    dispatch({ type: 'SAVE_STARTED' });
    try {
      const savedItem = item.id ? await updateItem(item) : await createItem(item);
      dispatch({ type: 'SAVE_SUCCESS', payload: savedItem });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <ItemContext.Provider value={{ ...state, saveItem }}>
      {children}
    </ItemContext.Provider>
  );
};