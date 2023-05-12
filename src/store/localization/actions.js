import {
  ADD_LOCALIZATION,
  ADD_LOCALIZATION_FAIL,
  ADD_LOCALIZATION_SUCCESS,
  DELETE_LOCALIZATION,
  DELETE_LOCALIZATION_FAIL,
  DELETE_LOCALIZATION_SUCCESS,
  GET_DEVICES,
  GET_DEVICES_FAIL,
  GET_DEVICES_SUCCESS,
  GET_LOCALIZATION,
  GET_LOCALIZATION_FAIL,
  GET_LOCALIZATION_SUCCESS,
  GET_LOCALIZATION_TABLE_COLUMN_NAMES,
  GET_LOCALIZATION_TABLE_COLUMN_NAMES_FAIL,
  GET_LOCALIZATION_TABLE_COLUMN_NAMES_SUCCESS,
  GET_SCREENS,
  GET_SCREENS_FAIL,
  GET_SCREENS_SUCCESS,
  GET_TRANSLATION,
  GET_TRANSLATION_FAIL,
  GET_TRANSLATION_SUCCESS,
  ON_ACTIVATE_DEACTIVATE_LOCALIZATION,
  ON_ACTIVATE_DEACTIVATE_LOCALIZATION_FAIL,
  ON_ACTIVATE_DEACTIVATE_LOCALIZATION_SUCCESS,
  UPDATE_LOCALIZATION,
  UPDATE_LOCALIZATION_FAIL,
  UPDATE_LOCALIZATION_SUCCESS
} from "./actionTypes"


// Get Localization Actions
export const getLocalization = () => ({
  type: GET_LOCALIZATION,
});

export const getLocalizationSuccess = localization => ({
  type: GET_LOCALIZATION_SUCCESS,
  payload: localization,
});

export const getLocalizationFail = error => ({
  type: GET_LOCALIZATION_FAIL,
  payload: error,
});


// Get Localization Table Columns Actions
export const getLocalizationTableColumnNames = () => ({
  type: GET_LOCALIZATION_TABLE_COLUMN_NAMES,
  moduleName: "LOCALIZATION"
});

export const getLocalizationTableColumnNamesSuccess = columnNames => ({
  type: GET_LOCALIZATION_TABLE_COLUMN_NAMES_SUCCESS,
  payload: columnNames,
});

export const getLocalizationTableColumnNamesFail = error => ({
  type: GET_LOCALIZATION_TABLE_COLUMN_NAMES_FAIL,
  payload: error,
});


// Add Localization Actions
export const addLocalization = localization => ({
  type: ADD_LOCALIZATION,
  payload: localization,
});

export const addLocalizationSuccess = localization => ({
  type: ADD_LOCALIZATION_SUCCESS,
  payload: localization,
});

export const addLocalizationFail = error => ({
  type: ADD_LOCALIZATION_FAIL,
  payload: error,
});


// Update Localization Actions
export const updateLocalization = (localization) => ({
  type: UPDATE_LOCALIZATION,
  payload: localization
});

export const updateLocalizationSuccess = localization => ({
  type: UPDATE_LOCALIZATION_SUCCESS,
  payload: localization,
});

export const updateLocalizationFail = error => ({
  type: UPDATE_LOCALIZATION_FAIL,
  payload: error,
});


export const deleteLocalization = localization => ({
  type: DELETE_LOCALIZATION,
  payload: localization,
});

export const deleteLocalizationSuccess = localization => ({
  type: DELETE_LOCALIZATION_SUCCESS,
  payload: localization,
});

export const deleteLocalizationFail = error => ({
  type: DELETE_LOCALIZATION_FAIL,
  payload: error,
});

//Get Screens Dropdown
export const getScreens = () => ({
  type: GET_SCREENS,
});

export const getScreensSuccess = screens => ({
  type: GET_SCREENS_SUCCESS,
  payload: screens,
});

export const getScreensFail = error => ({
  type: GET_SCREENS_FAIL,
  payload: error,
});

//Get Devices Dropdown
export const getDevices = () => ({
  type: GET_DEVICES,

});

export const getDevicesSuccess = devices => ({
  type: GET_DEVICES_SUCCESS,
  payload: devices,
});

export const getDevicesFail = error => ({
  type: GET_DEVICES_FAIL,
  payload: error,
});


export const activateDeactivateLocalization =  localization => ({
	type: ON_ACTIVATE_DEACTIVATE_LOCALIZATION,
	payload: localization
});

export const activateDeactivateLocalizationSuccess =  localization => ({
	type: ON_ACTIVATE_DEACTIVATE_LOCALIZATION_SUCCESS,
	payload: localization
});

export const activateDeactivateLocalizationFail =  error => ({
	type: ON_ACTIVATE_DEACTIVATE_LOCALIZATION_FAIL,
	payload: error
});

export const getTranslation = (translation) => ({
  type: GET_TRANSLATION,
  payload: translation
});

export const getTranslationSuccess = translation => ({
  type: GET_TRANSLATION_SUCCESS,
  payload: translation,
});

export const getTranslationFail = error => ({
  type: GET_TRANSLATION_FAIL,
  payload: error,
});


