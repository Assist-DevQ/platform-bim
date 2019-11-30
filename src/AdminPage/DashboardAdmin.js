import React from "react";
import { Pages } from './Pages';

class DashboardAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addClass: false, page: localStorage.getItem('page') }

        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };

        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ addClass: !this.state.addClass });
    }
    render() {
        let sidebarClass = [""];
        let sidebarToggled = [""];
        if (!this.state.addClass) {
            sidebarClass.push('sidebar navbar-nav fixed-top toggled');
            sidebarToggled.push('dash wrapper');
        }
        else {
            sidebarClass.push('sidebar navbar-nav fixed-top');
            sidebarToggled.push('dash wrapper sideToggled');
        }
        return (
            <div className={sidebarToggled.join(' ')}>
                <nav className="navbar navbar-expand main-nav navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand mr-1" href="/home"><strong className="logoColor">DevQ</strong></a>

                    <button className="btn btn-default btndis nav-link btn-sm text-white" onClick={this.toggle} id="sidebarToggle" href="#">
                        <i className="fa fa-bars fa-lg"></i>
                    </button>

                    <ul className="navbar-nav ml-auto md-md-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/home">
                                <i className="fa fa-home fa-lg"> Home</i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link dropdown-toggle" href="#btn" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user-circle fa-lg"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#profile" onClick={() => { this.setState({ page: "profile" }); }}>Profile</a>
                                <hr />
                                <a className="dropdown-item" href="#logout" data-toggle="modal" data-target="#logoutModal">Logout</a>
                            </div>
                        </li>
                    </ul>
                </nav>

                <div className="side">
                    <ul className={sidebarClass.join(' ')}>
                        <li className="nav-item">
                            <a className="nav-link" href="#users" onClick={() => { this.setState({ page: "users" }) }}>
                                <i className="fa fa-users fa-lg"></i>
                                <span> Users</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#projects" onClick={() => { this.setState({ page: "projects" }) }}>
                                <i className="fa fa-file-powerpoint-o fa-lg"></i>
                                <span> Projects</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#charts" onClick={() => { this.setState({ page: "charts" }) }}>
                                <i className="fa fa-line-chart fa-lg"></i>
                                <span> Charts</span></a>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <Pages page={this.state.page} />
                </div>
                <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Logout</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Are you sure you want to logout?</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary text-white" href="/login">Yes</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default DashboardAdmin;