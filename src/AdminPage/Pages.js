import React from "react";
import { connect } from 'react-redux';
import { userActions, projectActions } from "../_actions";

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {
                id: '',
                name: '',
                repository_link: '',
                production_url: '',
            },
            id: 0,
            submitted: false,
        }

        this.setId = this.setId.bind(this);
        this.setIdUpdate = this.setIdUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.resetModal = this.resetModal.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { project } = this.state;
        this.setState({
            project: {
                ...project,
                [name]: value
            }
        });
    }
      
    componentDidMount() {
        this.props.getUsers();
        this.props.getProjects();
    }

    handleDeleteUser(id) {
        return () => this.props.deleteUser(id);
    }

    handleDeleteProject(id) {
        return () => this.props.deleteProject(id);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { project } = this.state;
        if (project.name && project.repository_link && project.production_url) {
            this.props.addProject(project);
        }
    }

    handleSubmitUpdate(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { project } = this.state;
        if (project.name && project.repository_link && project.production_url) {
            this.props.updateProject(project);
        }
    }

    resetModal() {
        this.setState({
            project: { name: '', repository_link: '', production_url: '' },
            submitted: false
        });
    }

    setId(e) {
        const { id } = e.target;
        this.setState({ id: id });
    }

    setIdUpdate(e) {
        this.resetModal();
        const { id, name } = e.target;
        const v = name.split(' ');
        this.setState({ id: id, 
            project:{id: id, name: v[0], repository_link: v[1], production_url: v[2] }});
    }

    render() {
        const { projects, users, user, page } = this.props;
        const { project, submitted } = this.state;
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
                                                                        : user.id !== userS.id && <a id={userS.id} onClick={this.setId} href="#delete" data-toggle="modal" data-target="#deleteModal">Delete</a>
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
                                    <i className="fa fa-table"></i> Projects
                                    <a className="float-right" href="#add" data-toggle="modal" data-target="#addModal" onClick={this.resetModal}>Add new project</a></div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Project Name</th>
                                                    <th scope="col">Repository link</th>
                                                    <th scope="col">Production URL</th>
                                                    <th scope="col">Delete</th>
                                                    <th scope="col">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projects.items.map((projectS) =>
                                                    <tr key={projectS.id}>
                                                        <th scope="row">{projectS.id} </th>
                                                        <td>{projectS.name}</td>
                                                        <td>{projectS.repository_link}</td>
                                                        <td>{projectS.production_url}</td>
                                                        <td>
                                                            {
                                                                projectS.deleting ? <em> Deleting...</em>
                                                                    : projectS.deleteError ? <span className="text-danger"> - ERROR: {projectS.deleteError}</span>
                                                                        : <a id={projectS.id} onClick={this.setId} href="#delete" data-toggle="modal" data-target="#deleteProjModal">Delete</a>
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                projectS.updating ? <em> Updating...</em>
                                                                    : projectS.updateError ? <span className="text-danger"> - ERROR: {projectS.updateError}</span>
                                                                        : <a id={projectS.id} name={projectS.name + ' ' + projectS.repository_link + ' ' + projectS.production_url}
                                                                            onClick={this.setIdUpdate} href="#update" data-toggle="modal" data-target="#updateProjModal">Update</a>
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
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">No</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.handleDeleteUser(this.state.id)}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="deleteProjModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete project</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Are you sure you want to delete project?</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">No</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.handleDeleteProject(this.state.id)}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add project</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className={'form-group' + (submitted && !project.name ? ' has-error' : '')}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" name="name" value={project.name} onChange={this.handleChange} />
                                    {submitted && !project.name &&
                                        <div className="help-block">Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !project.repository_link ? ' has-error' : '')}>
                                    <label htmlFor="repository_link">Repository link</label>
                                    <input type="url" className="form-control" name="repository_link" value={project.repository_link} onChange={this.handleChange} />
                                    {submitted && !project.repository_link &&
                                        <div className="help-block">Repository link is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !project.production_url ? ' has-error' : '')}>
                                    <label htmlFor="production_url">Production url</label>
                                    <input type="url" className="form-control" name="production_url" value={project.production_url} onChange={this.handleChange} />
                                    {submitted && !project.production_url &&
                                        <div className="help-block">Production url is required</div>
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary" data-dismiss={project.name && project.production_url && project.repository_link ? "modal" : ""} onClick={this.handleSubmit}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="updateProjModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update project {this.state.id}</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className={'form-group' + (submitted && !project.name ? ' has-error' : '')}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" name="name" value={project.name} onChange={this.handleChange} />
                                    {submitted && !project.name &&
                                        <div className="help-block">Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !project.repository_link ? ' has-error' : '')}>
                                    <label htmlFor="repository_link">Repository link</label>
                                    <input type="url" className="form-control" name="repository_link" value={project.repository_link} onChange={this.handleChange} />
                                    {submitted && !project.repository_link &&
                                        <div className="help-block">Repository link is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !project.production_url ? ' has-error' : '')}>
                                    <label htmlFor="production_url">Production url</label>
                                    <input type="url" className="form-control" name="production_url" value={project.production_url} onChange={this.handleChange} />
                                    {submitted && !project.production_url &&
                                        <div className="help-block">Production url is required</div>
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary" data-dismiss={project.name && project.production_url && project.repository_link ? "modal" : ""} onClick={this.handleSubmitUpdate}>Update</button>
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
    deleteProject: projectActions.delete,
    addProject: projectActions.add,
    updateProject: projectActions.update,
}

const connectedPage = connect(mapState, actions)(Pages);
export { connectedPage as Pages }