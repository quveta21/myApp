import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// CSS imports rămân la fel...
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

import ItemList from './todo/ItemList';
import ItemEdit from './todo/ItemEdit';
import { ItemProvider } from './todo/ItemProvider'; // <--- Importam Providerul

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    {/* Provider invaluie Routerul. 
        Astfel orice pagina din interior are acces la ItemContext */}
    <ItemProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/items" element={<ItemList />} />
          <Route path="/item/:id" element={<ItemEdit />} />
          <Route path="/item" element={<ItemEdit />} /> {/* Ruta pentru Creare item nou */}
          <Route path="/" element={<Navigate to="/items" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </ItemProvider>
  </IonApp>
);

export default App;