import { Component } from "react";
import { func } from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null,
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error('Error fetching data.', error);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedCustomerId !== this.state.selectedCustomerId) {
            console.log(`New customer selected: ID ${this.state.selectedCustomerId}`);
        }
    }

    componentWillUnmount() {
        console.log('CustomerList component is unmounting...');
    }

    selectCustomer = (id) => {
        this.setState({ selectedCustomerId: id });
        this.props.onCustomerSelect(id);
    }

    deleteCustomer = (customerId) => {
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(() => {
                this.fetchCustomers();
            })
            .catch(error => {
                console.error('Error deleting customer.', error);
            });
    }

    render() {
        const { customers } = this.state;

        return (
            <div className='customer-list'>
                <h3>Customers</h3>
                <ul>
                    {customers.map((customer) => (
                        <li key={customer.id} >
                            <Link to={`/edit-customer/${customer.id}`}>{customer.name}</Link>
                            <button className="delete-btn" onClick={() => this.selectCustomer(customer.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

CustomerList.propTypes = {
    onCustomerSelect: func
}

export default CustomerList;