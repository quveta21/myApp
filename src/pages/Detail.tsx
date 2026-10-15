import { 
  IonBackButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router-dom';   {/* prinde ID-ul din URL */}

const Detail: React.FC = () => {
    // extragem paramentrul id din URL
    const { id } = useParams<{ id: string }>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        {/* butonul de 'Back' care te intoarce la lista master */}
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Detalii Task</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h2>Ati deschis task-ul cu ID: {id}</h2>
                <p>Detaliile aduse de pe server vor fi aici.</p>
            </IonContent>
        </IonPage>
    );
}

export default Detail;