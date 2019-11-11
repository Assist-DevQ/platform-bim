import React from 'react';

class DashboardUser extends React.Component {
    render() {
        const {user}=this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
            <h1>Hi {user.firstName}!</h1>

            <p>
                <a href="/login">Logout</a>
            </p>
            <p>
                <a href="/home">Home</a>
            </p>
        </div>
        );
    }
}

export default DashboardUser