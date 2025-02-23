import { Component } from "react";
import axios from "axios";


class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            errors: {}
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(name, value);
    }

    validateForm = () => {
        const { name, email, phone } = this.state;
        const errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!email) {
            errors.email = 'Email is required';
        }
        if (!phone) {
            errors.phone = 'Phone is required';
        }
        return errors;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            console.log('Submited customer: ', this.state);
            
            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim()
            };

            axios.post('http://127.0.0.1:5000/customers', customerData)
                .then(response => {
                    console.log('Data successfully submitted', response.data);
                    // Handle the successful submission here
                    // e.g. clear the form, show a success message, etc.
                })
                .catch(error => {
                    console.error('There was an error submitting the form.', error);
                    // Handle the error here
                    // e.g. display an error message, etc.
                });

        } else {
            this.setState({ errors });
        }
    }

    render() {
        const { name, email, phone, errors } = this.state;

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

export default CustomerForm;