import { Provider } from "react-redux"
import Main from "./components/Main/Main"
import Layout from "./layout/Layout"
import { store } from "./store"

function App() {

  return (
    <Provider store={store}>
      <Layout children={<Main />}/>
    </Provider>
  )
}

export default App
