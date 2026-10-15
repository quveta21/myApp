import React, { useContext, useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonInput, IonButton, IonItem, IonLoading
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemContext } from './ItemProvider';
import { ItemProps } from './Item';

const ItemEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Scoatem functia de salvare si lista de iteme din Seiful global
  const { items, saving, saveItem } = useContext(ItemContext);
  
  const [text, setText] = useState('');
  const [item, setItem] = useState<ItemProps | null>(null);

  // Cautam itemul in lista din Context (daca avem un ID in URL)
  useEffect(() => {
    if (id) {
      const foundItem = items.find(it => it.id === id);
      if (foundItem) {
        setItem(foundItem);
        setText(foundItem.text);
      }
    }
  }, [id, items]);

  const handleSave = async () => {
    const editedItem = item ? { ...item, text } : { text }; // Daca avem item facem update, daca nu, facem create
    if (saveItem) {
      await saveItem(editedItem);
      navigate('/items');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/items" />
          </IonButtons>
          <IonTitle>{id ? 'Editare Item' : 'Item Nou'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonLoading isOpen={saving} message="Se salveaza..." />
        
        <IonItem>
          <IonInput
            value={text}
            onIonChange={e => setText(e.detail.value || '')}
            label="Text Item"
            labelPlacement="floating"
          />
        </IonItem>
        
        <IonButton expand="block" onClick={handleSave} className="ion-margin-top">
          Salvează Modificările
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ItemEdit;