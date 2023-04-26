import {
  PLANT_LIST_REQUEST,
  PLANT_LIST_SUCCESS,
  PLANT_LIST_FAIL,
  PLANT_DETAILS_REQUEST,
  PLANT_DETAILS_SUCCESS,
  PLANT_DETAILS_FAIL,
} from "../constants/plantConstants";
import axios from "axios";

export const listPlants = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLANT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/plants/",
      config
    );

    dispatch({
      type: PLANT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLANT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.messge,
    });
  }
};

export const listPlantDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PLANT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`http://127.0.0.1:8000/api/plants/${id}`);

    dispatch({
      type: PLANT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLANT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletePlants = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/delete/${id}/`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createPlants = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/create/`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export default listPlants;
