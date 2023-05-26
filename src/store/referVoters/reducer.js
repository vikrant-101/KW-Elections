import {
  ADD_REFERVOTERS_FAIL,
  ADD_REFERVOTERS_SUCCESS,
  DELETE_REFERVOTERS_FAIL,
  DELETE_REFERVOTERS_SUCCESS,
  GET_REFERVOTERS,
  GET_REFERVOTERS_FAIL,
  GET_REFERVOTERS_SUCCESS,
  GET_REFERVOTERS_TABLE_COLUMN_NAMES_FAIL,
  GET_REFERVOTERS_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_REFERVOTERS_FAIL,
  ON_ACTIVATE_DEACTIVATE_REFERVOTERS_SUCCESS,
  UPDATE_REFERVOTERS_FAIL,
  UPDATE_REFERVOTERS_SUCCESS,
} from "./actionTypes";
import { toast } from "react-toastify";

const INIT_STATE = {
  referVoters: [],
  columnNames: [],
  isLoading: false,
  error: {},
};

const referVoters = (state = INIT_STATE, action) => {
  let _id, IsActive, updatedReferVoters;
  switch (action.type) {
    case GET_REFERVOTERS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_REFERVOTERS_SUCCESS:
      return {
        ...state,
        referVoters: action.payload,
        isLoading: false,
      };

    case GET_REFERVOTERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_REFERVOTERS_TABLE_COLUMN_NAMES_SUCCESS:
      return {
        ...state,
        columnNames: action.payload,
      };

    case GET_REFERVOTERS_TABLE_COLUMN_NAMES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_REFERVOTERS_SUCCESS:
      console.log(' action.payload: ',  action.payload);
      state = {
        ...state,
        referVoters: state.referVoters.map((referVoters) =>
          referVoters._id.toString() === action.payload.Data._id.toString()
            ? action.payload.Data
            : referVoters
        ),
      };
      toast.success(action.payload.Message);
      break;

    case ADD_REFERVOTERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload);
      break;

    case UPDATE_REFERVOTERS_SUCCESS:
      state = {
        ...state,
        referVoters: state.referVoters.map((referVoters) =>
          referVoters._id.toString() === action.payload.Data._id.toString()
            ? action.payload.Data
            : referVoters
        ),
      };
      toast.success(action.payload.Message);
      break;

    case UPDATE_REFERVOTERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message || state.error);
      break;

    case DELETE_REFERVOTERS_SUCCESS:
      state = {
        ...state,
        referVoters: state.referVoters.filter(
          (referVoters) =>
            referVoters._id.toString() !== action.payload.Data[0]._id.toString()
        ),
      };
      toast.success(action.payload.Message);
      break;

    case DELETE_REFERVOTERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message || state.error);
      break;

    case ON_ACTIVATE_DEACTIVATE_REFERVOTERS_SUCCESS:
      _id = action.payload._id;
      IsActive = action.payload.IsActive;
      updatedReferVoters = state.referVoters.map((referVoters) => {
        if (referVoters._id === _id) {
          return {
            ...referVoters,
            IsActive: !IsActive, // flip the IsActive value
          };
        } else {
          return referVoters;
        }
      });

      toast.success(
        `ReferVoters ${IsActive ? "deactivated" : "activated"} successfully`
      );
      state = {
        ...state,
        referVoters: updatedReferVoters,
      };
      break;

    case ON_ACTIVATE_DEACTIVATE_REFERVOTERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message);
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default referVoters;
