import Main from "./components/Main/Main"
import Layout from "./layout/Layout"

function App() {

  return (
    <Layout children={<Main />}/>
  )
}

export default App
