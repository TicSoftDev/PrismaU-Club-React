import { Provider } from 'react-redux'
import Rutas from './routes/Rutas'
import { store } from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <Rutas />
    </Provider>
  )
}

export default App
