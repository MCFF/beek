import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Details from "./pages/details/Details";
import Error404 from "./pages/404/Error404";
import Edit from "./pages/edit/Edit";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={List} />
        <Route exact path="/new" component={New} />
        <Route exact path="/audiobook/:idAudioBook" component={Details} />
        <Route exact path="/edit/:idAudioBook" component={Edit} />
        <Route exact component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
