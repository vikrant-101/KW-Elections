import {
	GET_TOTAL_COUNT_FAIL,
	GET_TOTAL_COUNT_SUCCESS,
} from "./actionTypes";


const INIT_STATE = {
	votersCount: null,
	votedCount: null,
	toBeVotedCount: null,
	referedCount: null,
	referedVotedCount: null,
	referedToBeVotedCount: null,
	error: {},
};

const dashboard = (state = INIT_STATE, action) => {
	switch (action.type) {

		case GET_TOTAL_COUNT_SUCCESS:
			return {
				...state,
				votersCount: action.payload.totalVoters,
				votedCount:  action.payload.totalVoted,
				toBeVotedCount:  action.payload.totalToBeVoted,
				referedCount:  action.payload.totalRefered,
				referedVotedCount:  action.payload.totalReferedVoted,
				referedToBeVotedCount:  action.payload.totalReferedToBeVoted,
			};

		case GET_TOTAL_COUNT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default dashboard;