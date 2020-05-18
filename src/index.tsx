import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//context provider
import { BrowserRouter as Router } from 'react-router-dom';
import { PermissionsProvider} from './Permissions'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PermissionsProvider>
        <App />
      </PermissionsProvider> 
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
