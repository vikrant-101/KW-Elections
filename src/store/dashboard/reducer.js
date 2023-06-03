import {
	GET_AGE_COUNT_FAIL,
	GET_AGE_COUNT_SUCCESS,
	GET_COUNT_FAIL,
	GET_COUNT_SUCCESS,
	GET_TOTAL_COUNT_FAIL,
	GET_TOTAL_COUNT_SUCCESS,
	GET_VOTERS_STATISTICS_FAIL,
	GET_VOTERS_STATISTICS_SUCCESS,
} from "./actionTypes";


const INIT_STATE = {
	votersCount: null,
	votedCount: null,
	toBeVotedCount: null,
	referedCount: null,
	referedVotedCount: null,
	referedToBeVotedCount: null,
	totalSubAdmins: null,
	totalReferences: null,
	totalSubReferences: null,
	totalAreas: null,
	totalSchools: null,
	totalClasses: null,
	error: {},
	ageCount: {},
	votersStats: {}
};

const dashboard = (state = INIT_STATE, action) => {
	switch (action.type) {

		case GET_TOTAL_COUNT_SUCCESS:
			return {
				...state,
				votersCount: action.payload.totalVoters,
				votedCount: action.payload.totalVoted,
				toBeVotedCount: action.payload.totalToBeVoted,
				referedCount: action.payload.totalRefered,
				referedVotedCount: action.payload.totalReferedVoted,
				referedToBeVotedCount: action.payload.totalReferedToBeVoted,
			};

		case GET_TOTAL_COUNT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_COUNT_SUCCESS:
			return {
				...state,
				totalSubAdmins: action.payload.totalSubAdmins,
				totalReferences: action.payload.totalReferences,
				totalSubReferences: action.payload.totalSubReferences,
				totalAreas: action.payload.totalAreas,
				totalSchools: action.payload.totalSchools,
				totalClasses: action.payload.totalClasses,
			};

		case GET_COUNT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_AGE_COUNT_SUCCESS:
			return {
				...state,
				ageCount: action.payload
			};

		case GET_AGE_COUNT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case GET_VOTERS_STATISTICS_SUCCESS:
			return {
				...state,
				votersStats: action.payload
			};

		case GET_VOTERS_STATISTICS_FAIL:
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