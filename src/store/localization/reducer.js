import {
  ADD_LOCALIZATION_FAIL,
  ADD_LOCALIZATION_SUCCESS,
  DELETE_LOCALIZATION_FAIL,
  DELETE_LOCALIZATION_SUCCESS,
  GET_DEVICES,
  GET_DEVICES_FAIL,
  GET_DEVICES_SUCCESS,
  GET_LOCALIZATION,
  GET_LOCALIZATION_FAIL,
  GET_LOCALIZATION_SUCCESS,
  GET_LOCALIZATION_TABLE_COLUMN_NAMES_FAIL,
  GET_LOCALIZATION_TABLE_COLUMN_NAMES_SUCCESS,
  GET_SCREENS,
  GET_SCREENS_FAIL,
  GET_SCREENS_SUCCESS,
  GET_TRANSLATION_FAIL,
  GET_TRANSLATION_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_LOCALIZATION_FAIL,
  ON_ACTIVATE_DEACTIVATE_LOCALIZATION_SUCCESS,
  UPDATE_LOCALIZATION_FAIL,
  UPDATE_LOCALIZATION_SUCCESS
} from "./actionTypes";
import { toast } from 'react-toastify';


const INIT_STATE = {
  localization: [],
  screens: [],
  devices: [],
  columnNames: [],
  isLoading: false,
  error: {},
};

const localization = (state = INIT_STATE, action) => {
  switch (action.type) {
    // Get Localization
    case GET_LOCALIZATION:
      return {
        ...state,
        isLoading: true
      };

    case GET_LOCALIZATION_SUCCESS:
      return {
        ...state,
        localization: action.payload,
        isLoading: false
      };

    case GET_LOCALIZATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Get Table Column Names
    case GET_LOCALIZATION_TABLE_COLUMN_NAMES_SUCCESS:
      return {
        ...state,
        columnNames: action.payload,
      };

    case GET_LOCALIZATION_TABLE_COLUMN_NAMES_FAIL:
      return {
        ...state,
        error: action.payload,
      };


    // Add Localization
    case ADD_LOCALIZATION_SUCCESS:
      // console.log('PAYLOAD', action.payload.Data)
      state = {
        ...state,
        localization: [action.payload.Data[0], ...state.localization],
      };
      toast.success(action.payload.Message);
      break;

    case ADD_LOCALIZATION_FAIL:
      // console.log('PAYLOAD', action.payload)
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload);
      break;


    // Update localization
    case UPDATE_LOCALIZATION_SUCCESS:
      state = {
        ...state,
        localization: state.localization.map((localization) =>
          localization._id.toString() === action.payload.Data[0]._id.toString()
            ? action.payload.Data[0]
            : localization
        ),
      };
      toast.success(action.payload.Message);
      break;

    case UPDATE_LOCALIZATION_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message || state.error);
      break;
    // Delete localization
    case DELETE_LOCALIZATION_SUCCESS:
      state = {
        ...state,
        localization: state.localization.filter(
          (localization) => localization._id.toString() !== action.payload.Data[0]._id.toString()
        ),
      };
      toast.success(action.payload.Message);
      break;

    case DELETE_LOCALIZATION_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message || state.error);
      break;

    // Get Screens Dropdown
    case GET_SCREENS:
      return {
        ...state,
      };

    case GET_SCREENS_SUCCESS:
      return {
        ...state,
        screens: action.payload,
      };

    case GET_SCREENS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // Get Devices DropDown
    case GET_DEVICES_SUCCESS:
      return {
        ...state,
        devices: action.payload,
      };

    case GET_DEVICES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ON_ACTIVATE_DEACTIVATE_LOCALIZATION_SUCCESS:
      state = {
        ...state,
        localization: state.localization.map((localization) =>
          localization._id.toString() === action.payload.Data[0]._id.toString()
            ? action.payload.Data[0]
            : localization
        )
      };
      toast.success(action.payload.Message);
      break;

    case ON_ACTIVATE_DEACTIVATE_LOCALIZATION_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message);
      break;

      case GET_TRANSLATION_SUCCESS:
        return {
          ...state,
          translation: action.payload.Data,
        };
  
      case GET_TRANSLATION_FAIL:
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

export default localization;