import { NavLink } from "react-router-dom";

function NavigationBar() {
    return (
        <nav className="clearfix">
            <NavLink to='/add-customer' activeClassName='active'>Add Customer</NavLink>
            <NavLink to='/customers' activeClassName='active'>Customers</NavLink>
        </nav>
    );
}

export default NavigationBar;