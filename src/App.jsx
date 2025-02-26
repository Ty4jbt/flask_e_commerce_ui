import { Routes, Route  } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import NavigationBar from './components/NavigationBar';
import CustomerFormWrapper from './components/CustomerFormWrapper';
import './AppStyles.css';

// 

function App() {
  return (
    <div className="app-container">
      <NavigationBar />
      <Routes>
        <Route path="/add-customer" element={<CustomerFormWrapper />} />
        <Route path="/edit-customer/:id" element={<CustomerFormWrapper />} />
        <Route path="/customers" element={<CustomerList />} />
      </Routes>
    </div>
  );
}

export default App;