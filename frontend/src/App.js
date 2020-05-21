import React from 'react';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
