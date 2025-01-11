import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Rutas from './routes/Rutas';

function App() {

  const client = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Toaster position='top-right' />
        <Rutas />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
