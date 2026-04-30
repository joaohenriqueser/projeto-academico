import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ResourcesProviders } from './services/providers/ResourcesProviders';
import { routes } from './services/router/Router';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(routes);

function App() {
  return (
    <div>
      <AuthProvider>
        <ResourcesProviders>
          <RouterProvider router={router} />
        </ResourcesProviders>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </div>
  );
}

export default App;
