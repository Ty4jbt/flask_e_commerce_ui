import { Component } from 'react';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import CustomerForm from './components/CustomerForm';
import ProductForm from './components/ProductForm';
import './AppStyles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomerId: null,
      selectedOrderId: null,
    };
  }

  handleCustomerSelect = (customerId) => {
    this.setState({ selectedCustomerId: customerId });
  }

  handleOrderSelect = (orderId) => {
    this.setState({ selectedOrderId: orderId });
  }

  render() {
    const { selectedCustomerId, selectedOrderId } = this.state;

    return (
      <div className='app-container'>
        <h1>Our Customers</h1>
        <CustomerForm />
        <br />
        <ProductForm />
        <CustomerList onCustomerSelect={this.handleCustomerSelect} />
        {selectedCustomerId && (
          <OrderList
            customerId={selectedCustomerId}
            onOrderSelect={this.handleOrderSelect}
          />
        )}
        {selectedOrderId && (
          < ProductList orderId={selectedOrderId} />
        )}
      </div>
    );
  }
}

export default App
