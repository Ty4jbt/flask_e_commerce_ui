import { Component } from "react";
import axios from "axios";
import { func, number } from "prop-types";


class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            errors: {},
            selectedCustomerId: null,
            isLoading: false
        };
    }

    fetchCustomerData = (id) => {
        axios.get(`http://127.0.0.1:5000/customers/${id}`)
            .then(response => {
                const customerData = response.data;
                this.setState({
                    name: customerData.name,
                    email: customerData.email,
                    phone: customerData.phone,
                    selectedCustomerId: id
                });
            })
            .catch(error => {
                console.error('Error fetching customer data.', error);
            });
    };

    componentDidMount() {
        const { id } = this.props.params;
        if (id) {
            this.fetchCustomerData(id);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customerId !== this.props.customerId) {
            this.setState({ selectedCustomerId: this.props.customerId });

            if (this.props.customerId) {
                axios.get(`http://127.0.0.1:5000/customers/${this.props.customerId}`)
                    .then(response => {
                        const customerData = response.data;
                        this.setState({
                            name: customerData.name,
                            email: customerData.email,
                            phone: customerData.phone
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching customer data.', error);
                    });
            }
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(name, value);
    }

    validateForm = () => {
        const { name, email, phone } = this.state;
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        if (!phone) errors.phone = 'Phone is required';
        return errors;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            this.setState({ isLoading: true, error: null });
            
            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim()
            };

            const apiURL = this.state.selectedCustomerId
                ? `http://127.0.0.1:5000/customers/${this.state.selectedCustomerId}`
                : 'http://127.0.0.1:5000/customers';
            
            const httpMethod(apiURL, customerData)
                .then(() => {
                    this.setState({
                        name: '',
                        email: '',
                        phone: '',
                        errors: {},
                        selectedCustomerId: null,
                        isLoading: false
                    });
                    this.props.navigate('/customers')
                    this.setState({ isLoading: false });
                })
                .catch(error => {
                    this.setState({ error: error.toString(), isLoading: false });
                });

        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { name, email, phone, errors, error, isLoading } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add/Edit Customer</h3>
                <label>
                    <input type="text" name="name" value={name} onChange={this.handleChange} />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </label>
                <br />
                <label>
                    <input type="email" name="email" value={email} onChange={this.handleChange} />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </label>
                <br />
                <label>
                    <input type="tel" name="phone" value={phone} onChange={this.handleChange} />
                    {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        )

    };

};

CustomerForm.propTypes = {
    customerId: number,
    onCustomerSelect: func
};

export default CustomerForm;