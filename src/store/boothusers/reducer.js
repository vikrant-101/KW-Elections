import {
  ADD_BOOTHUSERS_FAIL,
  ADD_BOOTHUSERS_SUCCESS,
  DELETE_BOOTHUSERS_FAIL,
  DELETE_BOOTHUSERS_SUCCESS,
  GET_BOOTHUSERS,
  GET_BOOTHUSERS_FAIL,
  GET_BOOTHUSERS_SUCCESS,
  GET_BOOTHUSERS_TABLE_COLUMN_NAMES_FAIL,
  GET_BOOTHUSERS_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_BOOTHUSERS_FAIL,
  ON_ACTIVATE_DEACTIVATE_BOOTHUSERS_SUCCESS,
  UPDATE_BOOTHUSERS_FAIL,
  UPDATE_BOOTHUSERS_SUCCESS,
} from "./actionTypes";
import { toast } from "react-toastify";

const INIT_STATE = {
  boothuser: [],
  columnNames: [],
  isLoading: false,
  error: {},
};

const boothuser = (state = INIT_STATE, action) => {
  let _id, IsActive, updatedElections;
  switch (action.type) {
    case GET_BOOTHUSERS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_BOOTHUSERS_SUCCESS:
      console.log("BOOTH DATA", action.payload.Data);
      return {
        ...state,
        boothuser: action.payload.Data,
        isLoading: false,
      };

    case GET_BOOTHUSERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOOTHUSERS_TABLE_COLUMN_NAMES_SUCCESS:
      return {
        ...state,
        columnNames: action.payload,
      };

    case GET_BOOTHUSERS_TABLE_COLUMN_NAMES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_BOOTHUSERS_SUCCESS:
      state = {
        ...state,
        boothuser: [action.payload.Data[0], ...state.boothuser],
      };
      toast.success(action.payload.Message);
      break;

    case ADD_BOOTHUSERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload);
      break;

    case UPDATE_BOOTHUSERS_SUCCESS:
		console.log(action.payload)
      state = {
        ...state,
        boothuser: state.boothuser.map((boothuser) =>
          boothuser._id.toString() === action.payload.Data[0]._id.toString()
            ? action.payload.Data[0]
            : boothuser
        ),
      };
      toast.success(action.payload.Message);
      break;

    case UPDATE_BOOTHUSERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message || state.error);
      break;

    case DELETE_BOOTHUSERS_SUCCESS:
      state = {
        ...state,
        boothuser: state.boothuser.filter(
          (boothuser) =>
            boothuser._id.toString() !== action.payload.Data[0]._id.toString()
        ),
      };
      toast.success(action.payload.Message);
      break;

    case DELETE_BOOTHUSERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message || state.error);
      break;

    case ON_ACTIVATE_DEACTIVATE_BOOTHUSERS_SUCCESS:
      _id = action.payload._id;
      IsActive = action.payload.IsActive;
      updatedElections = state.boothuser.map((boothuser) => {
        if (boothuser._id === _id) {
          return {
            ...boothuser,
            IsActive: !IsActive, // flip the IsActive value
          };
        } else {
          return boothuser;
        }
      });

      toast.success(
        `Elections ${IsActive ? "deactivated" : "activated"} successfully`
      );
      state = {
        ...state,
        boothuser: updatedElections,
      };
      break;

    case ON_ACTIVATE_DEACTIVATE_BOOTHUSERS_FAIL:
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

export default boothuser;
