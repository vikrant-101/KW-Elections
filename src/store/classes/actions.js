import {
    ADD_CLASSES,
    ADD_CLASSES_FAIL,
    ADD_CLASSES_SUCCESS,
    DELETE_CLASSES,
    DELETE_CLASSES_FAIL,
    DELETE_CLASSES_SUCCESS,
    GET_CLASSES,
    GET_CLASSES_FAIL,
    GET_CLASSES_SUCCESS,
    GET_CLASSES_TABLE_COLUMN_NAMES,
    GET_CLASSES_TABLE_COLUMN_NAMES_FAIL,
    GET_CLASSES_TABLE_COLUMN_NAMES_SUCCESS,
    ON_ACTIVATE_DEACTIVATE_CLASSES,
    ON_ACTIVATE_DEACTIVATE_CLASSES_FAIL,
    ON_ACTIVATE_DEACTIVATE_CLASSES_SUCCESS,
    UPDATE_CLASSES,
    UPDATE_CLASSES_FAIL,
    UPDATE_CLASSES_SUCCESS
  } from "./actionTypes"
  
  
  export const getClasses = ({userID}) => ({
    type: GET_CLASSES,
    userID: userID
  });
  
  export const getClassesSuccess = classes => ({
    type: GET_CLASSES_SUCCESS,
    payload: classes,
  });
  
  export const getClassesFail = error => ({
    type: GET_CLASSES_FAIL,
    payload: error,
  });
  
  export const getClassesTableColumnNames = () => ({
    type: GET_CLASSES_TABLE_COLUMN_NAMES,
    moduleName: "CLASSES"
  });
  
  export const getClassesTableColumnNamesSuccess = columnNames => ({
    type: GET_CLASSES_TABLE_COLUMN_NAMES_SUCCESS,
    payload: columnNames,
  });
  
  export const getClassesTableColumnNamesFail = error => ({
    type: GET_CLASSES_TABLE_COLUMN_NAMES_FAIL,
    payload: error,
  });
  
  export const addClasses = classes => ({
    type: ADD_CLASSES,
    payload: classes,
  });
  
  export const addClassesSuccess = classes => ({
    type: ADD_CLASSES_SUCCESS,
    payload: classes,
  });
  
  export const addClassesFail = error => ({
    type: ADD_CLASSES_FAIL,
    payload: error,
  });
  
  export const updateClasses = (classes) => ({
    type: UPDATE_CLASSES,
    payload: classes
  });
  
  export const updateClassesSuccess = classes => ({
    type: UPDATE_CLASSES_SUCCESS,
    payload: classes,
  });
  
  export const updateClassesFail = error => ({
    type: UPDATE_CLASSES_FAIL,
    payload: error,
  });
  
  export const deleteClasses = classes => ({
    type: DELETE_CLASSES,
    payload: classes,
  });
  
  export const deleteClassesSuccess = classes => ({
    type: DELETE_CLASSES_SUCCESS,
    payload: classes,
  });
  
  export const deleteClassesFail = error => ({
    type: DELETE_CLASSES_FAIL,
    payload: error,
  });
  
  export const activateDeactivateClasses = classes => ({
    type: ON_ACTIVATE_DEACTIVATE_CLASSES,
    payload: classes
  });
  
  export const activateDeactivateClassesSuccess = classes => ({
    type: ON_ACTIVATE_DEACTIVATE_CLASSES_SUCCESS,
    payload: classes
  });
  
  export const activateDeactivateClassesFail = error => ({
    type: ON_ACTIVATE_DEACTIVATE_CLASSES_FAIL,
    payload: error
  });
  
  
  
  