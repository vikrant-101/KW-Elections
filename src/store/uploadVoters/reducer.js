import {
  CSV_BEING_UPLOADED,
  ADD_UPLOAD_VOTERS_FAIL,
  ADD_UPLOAD_VOTERS_SUCCESS,
  ADD_ELECTION_CIRCLE_SUCCESS,
  ADD_ELECTION_CIRCLE_FAIL,
  DELETE_UPLOAD_VOTERS_FAIL,
  DELETE_UPLOAD_VOTERS_SUCCESS,
  GET_ELECTION_CIRCLE,
  GET_ELECTION_CIRCLE_FAIL,
  GET_ELECTION_CIRCLE_SUCCESS,
  GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES_FAIL,
  GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS_FAIL,
  ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS_SUCCESS,
  UPDATE_UPLOAD_VOTERS_FAIL,
  UPDATE_UPLOAD_VOTERS_SUCCESS,
  ADD_UPLOAD_VOTERS,
} from "./actionTypes";
import { toast } from "react-toastify";

const INIT_STATE = {
  uploadVoters: [],
  electionCircle: [],
  columnNames: [],
  isLoading: false,
  beingUploaded: 1,
  error: {},
};

const uploadVoters = (state = INIT_STATE, action) => {
  let _id, IsActive, updatedUploadVoters;
  switch (action.type) {
    case GET_ELECTION_CIRCLE:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ELECTION_CIRCLE_SUCCESS:
      return {
        ...state,
        electionCircle: action.payload,
        isLoading: false,
      };

    case GET_ELECTION_CIRCLE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES_SUCCESS:
      return {
        ...state,
        columnNames: action.payload,
      };

    case GET_UPLOAD_VOTERS_TABLE_COLUMN_NAMES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CSV_BEING_UPLOADED:
      return {
        ...state,
        beingUploaded: action.payload,
      };

    case ADD_UPLOAD_VOTERS: 
    return {
      ...state,
      beingUploaded: 0,
    }

    case ADD_UPLOAD_VOTERS_SUCCESS:
      state = {
        ...state,
        beingUploaded: 1,
      };
      toast.success(`Successfully uploaded ${action.payload.Data} voters`);
      break;

    case ADD_UPLOAD_VOTERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload);
      break;
    case ADD_ELECTION_CIRCLE_SUCCESS:
      state = {
        ...state,
        electionCircle: action.payload.Data,
      };
      toast.success(action.payload.Message);
      break;

    case ADD_ELECTION_CIRCLE_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload);
      break;

    case UPDATE_UPLOAD_VOTERS_SUCCESS:
      state = {
        ...state,
        uploadVoters: state.uploadVoters.map((uploadVoters) =>
          uploadVoters._id.toString() === action.payload.Data[0]._id.toString()
            ? action.payload.Data[0]
            : uploadVoters
        ),
      };
      toast.success(action.payload.Message);
      break;

    case UPDATE_UPLOAD_VOTERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message || state.error);
      break;

    case DELETE_UPLOAD_VOTERS_SUCCESS:
      state = {
        ...state,
        uploadVoters: state.uploadVoters.filter(
          (uploadVoters) =>
            uploadVoters._id.toString() !==
            action.payload.Data[0]._id.toString()
        ),
      };
      toast.success(action.payload.Message);
      break;

    case DELETE_UPLOAD_VOTERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      toast.error(action.payload.Message || state.error);
      break;

    case ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS_SUCCESS:
      _id = action.payload._id;
      IsActive = action.payload.IsActive;
      updatedUploadVoters = state.uploadVoters.map((uploadVoters) => {
        if (uploadVoters._id === _id) {
          return {
            ...uploadVoters,
            IsActive: !IsActive, // flip the IsActive value
          };
        } else {
          return uploadVoters;
        }
      });

      toast.success(
        `Upload Voters ${IsActive ? "deactivated" : "activated"} successfully`
      );
      state = {
        ...state,
        uploadVoters: updatedUploadVoters,
      };
      break;

    case ON_ACTIVATE_DEACTIVATE_UPLOAD_VOTERS_FAIL:
      state = {
        ...state,
        error: action.payload,
      };
      action.payload.Message
        ? toast.error(action.payload.Message)
        : toast.error(action.payload);
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default uploadVoters;
