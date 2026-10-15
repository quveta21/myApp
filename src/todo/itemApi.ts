import axios from 'axios';
import { ItemProps } from './Item';

const baseUrl = 'http://localhost:3000/item';
const wsUrl = 'ws://localhost:3000';

const config = { headers: { 'Content-Type': 'application/json' } };

// REST API
export const getItems: () => Promise<ItemProps[]> = () => {
  return axios.get(baseUrl, config).then(res => res.data);
}

export const createItem: (item: ItemProps) => Promise<ItemProps> = (item) => {
  return axios.post(baseUrl, item, config).then(res => res.data);
}

export const updateItem: (item: ItemProps) => Promise<ItemProps> = (item) => {
  return axios.put(`${baseUrl}/${item.id}`, item, config).then(res => res.data);
}

// WebSockets
export const newWebSocket = (onMessage: (data: any) => void) => {
  const ws = new WebSocket(wsUrl);
  ws.onopen = () => console.log('WebSocket conectat!');
  // Cand serverul trimite mesaj apelam functia onMessage
  ws.onmessage = messageEvent => {
    const data = JSON.parse(messageEvent.data);
    onMessage(data); // Trimitem datele mai departe catre Provider
  };
  ws.onerror = error => console.error('Eroare WebSocket:', error);
  ws.onclose = () => console.log('WebSocket deconectat');
  return ws;
}