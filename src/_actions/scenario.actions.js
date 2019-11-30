import { scenarioConstants } from '../_constants';
import { scenarioService } from '../_services';

export const scenarioActions = {
    getAll,
    add
};

function getAll(id) {
    return dispatch => {
        dispatch(request(id));

        scenarioService.getAll(id)
            .then(
                scenarios => dispatch(success(scenarios)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: scenarioConstants.GETALL_REQUEST, id } }
    function success(scenarios) { return { type: scenarioConstants.GETALL_SUCCESS, scenarios } }
    function failure(error) { return { type: scenarioConstants.GETALL_FAILURE, error } }
}

function add(scenario, proj_id) {
    return dispatch => {
        dispatch(request(scenario));
        scenarioService.add(scenario, proj_id)
            .then(
                resp => {
                    dispatch(success(resp.scenario));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(scenario) { return { type: scenarioConstants.ADD_REQUEST, scenario } }
    function success(scenario) { return { type: scenarioConstants.ADD_SUCCESS, scenario } }
    function failure(error) { return { type: scenarioConstants.ADD_FAILURE, error } }
}