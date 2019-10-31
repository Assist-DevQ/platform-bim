import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class UserPage extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
               
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const connectedUserPage = connect(mapState)(UserPage);
export { connectedUserPage as UserPage };