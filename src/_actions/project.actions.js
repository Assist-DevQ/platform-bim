import { projectConstants } from '../_constants';
import { projectService } from '../_services';

export const projectActions = {
    update,
    add,
    getAll,
    delete: _delete
};

function add(project) {
    return dispatch => {
        dispatch(request(project));
        projectService.add(project)
            .then(
                resp => {
                    dispatch(success(resp.project));
                    //dispatch(alertActions.success('Add project successful'));
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(project) { return { type: projectConstants.ADD_REQUEST, project } }
    function success(project) { return { type: projectConstants.ADD_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.ADD_FAILURE, error } }
}

function update(project) {
    return dispatch => {
        dispatch(request(project));

        projectService.update(project)
            .then(
                proj => {
                    dispatch(success(project));
                    //dispatch(alertActions.success('Update project successful'));
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(project) { return { type: projectConstants.UPDATE_REQUEST, project } }
    function success(project) { return { type: projectConstants.UPDATE_SUCCESS, project } }
    function failure(error) { return { type: projectConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        projectService.getAll()
            .then(
                projects => dispatch(success(projects)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: projectConstants.GETALL_REQUEST } }
    function success(projects) { return { type: projectConstants.GETALL_SUCCESS, projects } }
    function failure(error) { return { type: projectConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        projectService.delete(id)
            .then(
                project => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: projectConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: projectConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: projectConstants.DELETE_FAILURE, id, error } }
}
