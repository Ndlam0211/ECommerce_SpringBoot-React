import "./assets/sass/app.scss"
import Header from './layouts/Header';
import Header2 from './layouts/Header2';
import Footer from './layouts/Footer';
import Main from './layouts/Main';
import { Provider } from "react-redux";
import store from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <Header2></Header2>
      <Main></Main>
      <Footer></Footer>
    </Provider>
  );
}

export default App;
