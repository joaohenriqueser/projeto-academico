import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ResourcesProviders } from './services/providers/ResourcesProviders';
import { routes } from './services/router/Router';

const router = createBrowserRouter(routes);

function App() {
  return (
    <div>
      <ResourcesProviders>
        <RouterProvider router={router} />
      </ResourcesProviders>
    </div>
  );
}

export default App;
