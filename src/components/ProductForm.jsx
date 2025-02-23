import { useRef, useState } from 'react';

// Uncontrolled component
// Simpler. Direct Data Management. Improved Performance. Closer to Traditional HTML.

const ProductForm = () => {
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        if (!name) errors.name = 'Product name is required';
        if (!price || price <= 0) errors.price = 'Product price must be a positive number';
        return errors;
    };
        
    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const name = nameRef.current.value;
            const price = priceRef.current.value;
            console.log('Submitted Product:', { name, price });
            // handle the form submission
        } else {
            setErrors(errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add/Edit Product</h3>
            <label>
                <input type="text" ref={nameRef} />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </label>
            <br />
            <label>
                <input type="number" ref={priceRef} />
                {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    )
};

export default ProductForm;