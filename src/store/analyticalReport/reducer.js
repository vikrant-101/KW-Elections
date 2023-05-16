import {
	GET_AREAWISE_REPORT,
    GET_AREAWISE_REPORT_FAIL,
    GET_AREAWISE_REPORT_SUCCESS,
    GET_AREAWISE_TABLE_COLUMN_NAMES_FAIL,
    GET_AREAWISE_TABLE_COLUMN_NAMES_SUCCESS,
    GET_SCHOOLWISE_REPORT,
    GET_SCHOOLWISE_REPORT_FAIL,
    GET_SCHOOLWISE_REPORT_SUCCESS,
    GET_SCHOOLWISE_TABLE_COLUMN_NAMES_FAIL,
    GET_SCHOOLWISE_TABLE_COLUMN_NAMES_SUCCESS,
    GET_BOOTHWISE_REPORT,
    GET_BOOTHWISE_REPORT_FAIL,
    GET_BOOTHWISE_REPORT_SUCCESS,
    GET_BOOTHWISE_TABLE_COLUMN_NAMES_FAIL,
    GET_BOOTHWISE_TABLE_COLUMN_NAMES_SUCCESS,
    GET_FAMILYNAMEWISE_REPORT,
    GET_FAMILYNAMEWISE_REPORT_SUCCESS,
    GET_FAMILYNAMEWISE_REPORT_FAIL,
    GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES_FAIL,
    GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES_SUCCESS
} from "./actionTypes";



const INIT_STATE = {
	areaWise: [],
	schoolWise: [],
	boothWise: [],
	familyNameWise: [],
    areaWiseColumnNames: [],
    schoolWiseColumnNames: [],
    boothWiseColumnNames: [],
    familyNameWiseColumnNames: [],
	isLoading: false,
	error: {},
};

const analyticalReport = (state = INIT_STATE, action) => {
	let _id, IsActive;
	switch (action.type) {
		case GET_AREAWISE_REPORT:
			return {
				...state,
				isLoading: true
			};

		case GET_AREAWISE_REPORT_SUCCESS:
			return {
				...state,
				areaWise: action.payload,
				isLoading: false
			};

		case GET_AREAWISE_REPORT_FAIL:
			return {
				...state,
				error: action.payload,
			};

        case GET_AREAWISE_TABLE_COLUMN_NAMES_SUCCESS:
            return {
                ...state,
                areaWiseColumnNames: action.payload,
            };

        case GET_AREAWISE_TABLE_COLUMN_NAMES_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case GET_SCHOOLWISE_REPORT:
            return {
                ...state,
                isLoading: true
            };

        case GET_SCHOOLWISE_REPORT_SUCCESS:
            return {
                ...state,
                schoolWise: action.payload,
                isLoading: false
            };

        case GET_SCHOOLWISE_REPORT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case GET_SCHOOLWISE_TABLE_COLUMN_NAMES_SUCCESS:
            return {
                ...state,
                schoolWiseColumnNames: action.payload,
            };

        case GET_SCHOOLWISE_TABLE_COLUMN_NAMES_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case GET_BOOTHWISE_REPORT:
            return {
                ...state,
                isLoading: true
            };

        case GET_BOOTHWISE_REPORT_SUCCESS:
            return {
                ...state,
                boothWise: action.payload,
                isLoading: false
            };

        case GET_BOOTHWISE_REPORT_FAIL:
            return {
                ...state,
                error: action.payload,
            };
    
        case GET_BOOTHWISE_TABLE_COLUMN_NAMES_SUCCESS:
            return {
                ...state,
                boothWiseColumnNames: action.payload,
            };

        case GET_BOOTHWISE_TABLE_COLUMN_NAMES_FAIL:
            return {
                ...state,
                error: action.payload,
            };


        case GET_FAMILYNAMEWISE_REPORT:
            return {
                ...state,
                isLoading: true
            };

        case GET_FAMILYNAMEWISE_REPORT_SUCCESS:
            return {
                ...state,
                familyNameWise: action.payload,
                isLoading: false
            };

        case GET_FAMILYNAMEWISE_REPORT_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES_SUCCESS:
            return {
                ...state,
                familyNameWiseColumnNames: action.payload,
            };

        case GET_FAMILYNAMEWISE_TABLE_COLUMN_NAMES_FAIL:
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

export default analyticalReport;