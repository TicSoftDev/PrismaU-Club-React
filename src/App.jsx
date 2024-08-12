import { Provider } from 'react-redux'
import { store } from './redux/store'
import Rutas from './routes/Rutas'

function App() {

  return (
    <Provider store={store}>
      <Rutas />
    </Provider>
  )
}

export default App
