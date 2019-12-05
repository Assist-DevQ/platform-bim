import React from "react";
import { connect } from 'react-redux';
import { userActions, projectActions, projectIdActions, scenarioActions, scenarioIdActions } from "../_actions";
import image_card from '../assets/img/img_index.jpg';

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
            scenario: {
                id: '',
                name: '',
            },
            id: 0,
            submitted: false,
            sc: false,
            branchSelectedId: 0,
        }

        this.setId = this.setId.bind(this);
        this.setIdUpdate = this.setIdUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeScenario = this.handleChangeScenario.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleSubmitScenario = this.handleSubmitScenario.bind(this);
        this.handleChangeSelectList = this.handleChangeSelectList.bind(this);
        this.resetModal = this.resetModal.bind(this);
        this.resetModalScenario = this.resetModalScenario.bind(this);
    }

    getImages(sc_id) {
        if (this.props.project.branches[this.state.branchSelectedId].current_hash !== undefined) {
            const other = this.props.project.branches[this.state.branchSelectedId].current_hash
            this.props.getScenarioById(this.state.project.id, sc_id, other);
        }
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

    handleChangeScenario(event) {
        const { name, value } = event.target;
        const { scenario } = this.state;
        this.setState({
            scenario: {
                ...scenario,
                [name]: value
            }
        });
    }

    handleChangeSelectList(event) {
        this.setState({ branchSelectedId: event.target.value })
    }

    componentDidMount() {
        this.props.getUsers();
        this.props.getProjects();
    }

    componentDidUpdate(prevProps) {
        if (this.props.page !== prevProps.page) {
            this.setState({ sc: false })
        }
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

    handleSubmitScenario(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { scenario } = this.state;
        if (scenario.name) {
            this.props.addScenario(scenario, this.state.project.id);
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

    resetModalScenario() {
        this.setState({
            scenario: { name: '' },
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
        this.setState({
            id: id,
            project: { id: id, name: v[0], repository_link: v[1], production_url: v[2] }
        });
    }

    render() {
        const { projects, scenarios, users, user, page } = this.props;
        const { project, scenario, submitted, sc } = this.state;
        return (
            <div>
                {page === "profile" &&
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <div>Dashboard</div>
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
                                <div>Dashboard</div>
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
                {page === "projects" && !sc &&
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <div>Dashboard</div>
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
                                                    <th scope="col">Repository link</th>
                                                    <th scope="col">Project Name</th>
                                                    <th scope="col">Production URL</th>
                                                    <th scope="col">Delete</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Scenarios</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projects.items.map((projectS) =>
                                                    <tr key={projectS.id}>
                                                        <th scope="row">{projectS.id} </th>
                                                        <td>{projectS.repository_link}</td>
                                                        <td>{projectS.name}</td>
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
                                                        <td>
                                                            <a href="#projects" onClick={() => { this.setState({ sc: true, project: { name: projectS.name, id: projectS.id, repository_link: project.repository_link, production_url: project.production_url } }); this.props.getScenarios(projectS.id); this.props.getProjectById(projectS.id); }}>Open scenarios</a>
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
                {page === "projects" && sc &&
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <div>Dashboard</div>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#projects" onClick={() => this.setState({ sc: false })}>Projects</a>
                            </li>
                            <li className="breadcrumb-item active">Scenarios</li>
                        </ol>
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-table"></i> Scenarios
                                    <a className="float-right" href="#add" data-toggle="modal" data-target="#addModalScenario" onClick={this.resetModalScenario}>Add new scenario</a>
                            </div>
                            <div className="card-header text-center text-white bg-dark">
                                <div><b>ID: {project.id} - Name Project: {project.name}</b></div>
                            </div>
                            {scenarios.loading && <em>Loading scenarios...</em>}
                            {scenarios.error && <span className="text-danger">ERROR: {scenarios.error}</span>}
                            {scenarios.items &&
                                <div className="card-body box">
                                    {scenarios.items.map((scenarioS) =>
                                        <div key={scenarioS.id} className="card-group">
                                            <div className="card card-sc">
                                                <img className="card-img-top" src={image_card} alt='' height='200' />
                                                <div className="card-body">
                                                    <h5 className="card-title">{scenarioS.name}</h5>
                                                    <div className="input-group">
                                                        <select className="form-control" onChange={this.handleChangeSelectList}>
                                                            {this.props.project.branches && this.props.project.branches.map((branch, index) =>
                                                                <option key={index} value={index}>{branch.name}</option>
                                                            )}
                                                        </select>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <button className="btn btn-dark text-white" href="#open" data-toggle="modal" data-target="#openScenario" onClick={() => { this.setState({ scenario: { id: scenarioS.id, name: scenarioS.name } }); this.getImages(scenarioS.id) }}>Open</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
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
                <div className="modal fade" id="addModalScenario" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add scenario</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className={'form-group' + (submitted && !scenario.name ? ' has-error' : '')}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" name="name" value={scenario.name} onChange={this.handleChangeScenario} />
                                    {submitted && !scenario.name &&
                                        <div className="help-block">Name is required</div>
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary" data-dismiss={scenario.name ? "modal" : ""} onClick={this.handleSubmitScenario}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade mymodal" id="openScenario" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-full" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Project name: {project.name}<br />Scenario name: {scenario.name} </h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            {this.props.scenario.baseImages &&
                                <div>
                                    {(this.props.scenario.hasDiff && this.props.scenario.hasDiff.indexOf(true) === -1 ?
                                        <h4 className="alert alert-success text-center" role="alert">Test passed!</h4> :
                                        <h4 className="alert alert-danger text-center" role="alert">Test failed!</h4>)
                                    }
                                    {this.props.scenario.baseImages.map((source, index) =>
                                        <div key={index} className="modal-body boxmodal">
                                            <div><h5>Original Image</h5><img src={source} className="imgmodal" alt="" /></div>
                                            {!this.props.scenario.hasDiff[index] ?
                                                <div><h5>Diff Image</h5><img src={this.props.scenario.diffImages[index]} className="imgmodal borderGreen" alt="" /></div> :
                                                <div><h5>Diff Image</h5><img src={this.props.scenario.diffImages[index]} className="imgmodal borderRed" alt="" /></div>
                                            }
                                        </div>
                                    )
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {localStorage.setItem('page', page)}
            </div >
        );
    }
}

function mapState(state) {
    const { users, authentication, projects, project, scenarios, scenario } = state;
    const { user } = authentication;
    return { user, users, projects, project, scenarios, scenario };
}

const actions = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getProjects: projectActions.getAll,
    getProjectById: projectIdActions.getById,
    deleteProject: projectActions.delete,
    addProject: projectActions.add,
    updateProject: projectActions.update,
    getScenarios: scenarioActions.getAll,
    addScenario: scenarioActions.add,
    getScenarioById: scenarioIdActions.getById,
}

const connectedPage = connect(mapState, actions)(Pages);
export { connectedPage as Pages }