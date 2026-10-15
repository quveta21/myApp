import React, { useContext } from 'react';
import {
  IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonLoading, IonFab, IonFabButton, IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons'; // Iconita de plus
import { ItemContext } from './ItemProvider';

const ItemList: React.FC = () => {
  // Ne abonam la Context. Orice se intampla in Provider, se va reflecta automat aici!
  const { items, fetching } = useContext(ItemContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Iteme</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={fetching} message="Se aduc datele de la server..." />
        
        <IonList>
          {items.map(({ id, text }) => (
            <IonItem key={id} button={true} routerLink={`/item/${id}`}>
              <IonLabel>{text}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Buton plutitor pentru adaugare item nou */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/item">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ItemList;