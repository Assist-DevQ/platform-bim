import { scenarioIdConstants } from '../_constants';
import { scenarioIdService } from '../_services';

export const scenarioIdActions = {
    getById
};

function getById(proj_id, sc_id, current_hash) {
    return dispatch => {
        dispatch(request(proj_id, sc_id, current_hash));

        scenarioIdService.getById(proj_id, sc_id, current_hash)
            .then(
                scenario => dispatch(success(scenario)),
                error => dispatch(failure(error))
            );
    };

    function request(proj_id, sc_id, current_hash) { return { type: scenarioIdConstants.GET_REQUEST, proj_id, sc_id, current_hash } }
    function success(scenario) { return { type: scenarioIdConstants.GET_SUCCESS, scenario } }
    function failure(error) { return { type: scenarioIdConstants.GET_FAILURE, error } }
}