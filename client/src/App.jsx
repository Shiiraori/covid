import React from "react";
import Homepage from "./components/Homepage";
import CovidDataTable from "./components/data";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Homepage {...props} />} />
          <Route
            exact
            path="/data"
            render={(props) => <CovidDataTable {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
