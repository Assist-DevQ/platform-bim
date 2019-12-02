import { projectIdConstants } from '../_constants';
import { projectIdService } from '../_services';

export const projectIdActions = {
    getById
};

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        projectIdService.getById(id)
            .then(
                project => dispatch(success(project)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: projectIdConstants.GET_REQUEST, id } }
    function success(project) { return { type: projectIdConstants.GET_SUCCESS, project } }
    function failure(error) { return { type: projectIdConstants.GET_FAILURE, error } }
}
