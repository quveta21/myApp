import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel 
} from '@ionic/react';
import React from 'react';
import './Home.css';
import ExploreContainer from '../components/ExploreContainer';

interface Task {
  id: number;
  title: string;
  description: string;
}

const mockTasks : Task[] = [
  { id: 1, title: 'Proiect Ionic', description: 'Termin primul laborator la PDM' },
  { id: 2, title: 'Curatenie', description: 'Duc gunoiul si aspir' },
  { id: 3, title: 'Sala', description: 'Leg day' }
]

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista Task-uri</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lista Task-uri</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {/* Lista cu Task-uri */}
        <IonList>
          {/* Trecem prin lista si adaugam elementele */}
          {mockTasks.map((task) => (
            <IonItem 
              key={task.id} 
              button={true} 
              detail={true}
              routerLink={`/task/${task.id}`}   //injectam ID-ul direct in URL pentru redirectionarea potrivita
            >
              <IonLabel>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Home;
