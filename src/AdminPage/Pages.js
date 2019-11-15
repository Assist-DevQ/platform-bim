import React from "react";
import { connect } from 'react-redux';
import { userActions, projectActions } from "../_actions";

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: 0 }

        this.setId = this.setId.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
        this.props.getProjects();
    }

    handleDeleteUser(id) {
        return () => this.props.deleteUser(id);
    }

    setId(e) {
        const { id } = e.target;
        this.setState({ id: id });
    }

    render() {
        const { projects, users, user, page } = this.props;
        return (
            <div>
                {page === "profile" &&
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/users">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>

                        <h1>Hi {user.firstName}!</h1>
                        <hr />
                    </div>
                }
                {page === "users" &&
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/users">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Users</li>
                        </ol>
                        {users.loading && <em>Loading users...</em>}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.items &&
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-table"></i> Users
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">First name</th>
                                                    <th scope="col">Last name</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.items.map((userS) =>
                                                    <tr key={userS.id}>
                                                        <th scope="row">{userS.id} </th>
                                                        <td>{userS.firstName}</td>
                                                        <td>{userS.lastName}</td>
                                                        <td>
                                                            {
                                                                userS.deleting ? <em> Deleting...</em>
                                                                    : userS.deleteError ? <span className="text-danger"> - ERROR: {userS.deleteError}</span>
                                                                        : user.id !== userS.id && <a id={userS.id} onClick={this.setId} href="#d" data-toggle="modal" data-target="#deleteModal">Delete</a>
                                                            }
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
                {page === "projects" &&
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/users">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Projects</li>
                        </ol>

                        {projects.loading && <em>Loading projects...</em>}
                        {projects.error && <span className="text-danger">ERROR: {projects.error}</span>}
                        {projects.items &&
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-table"></i> Projects</div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Project Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projects.items.map((projectS) =>
                                                    <tr key={projectS.id}>
                                                        <th scope="row">{projectS.id} </th>
                                                        <td>{projectS.name}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
                {page === "charts" &&
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/users">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Charts</li>
                        </ol>

                    </div>
                }

                <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete user</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Are you sure you want to delete user?</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.handleDeleteUser(this.state.id)}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
                {localStorage.setItem('page', page)}
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication, projects } = state;
    const { user } = authentication;
    return { user, users, projects };
}

const actions = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getProjects: projectActions.getAll,
    deleteProjects: projectActions.delete
}

const connectedPage = connect(mapState, actions)(Pages);
export { connectedPage as Pages }