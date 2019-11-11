import React from 'react';
//import DashboardUser from './DashboardUser';
import DashboardAdmin from '../AdminPage/DashboardAdmin';

class UserPage extends React.Component {
    render() {
        return (
            // <div>
            //     {user.role === 'USER' ?
            //         <DashboardUser /> :
            //         <DashboardAdmin />
            //     }
            // </div>
            <DashboardAdmin />
        );
    }
}
export {UserPage}
