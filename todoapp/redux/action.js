import axios from "axios";
import {
  addTaskFailure,
  addTaskRequest,
  addTaskSuccess,
  deleteTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  forgetPasswordFailure,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  loadUserFailure,
  loadUserRequest,
  loadUserSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  updatePasswordFailure,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  verificationFailure,
  verificationRequest,
  verificationSuccess,
} from "./reducer";

const serverUrl = "https://todo.fr.to/api/v1";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${serverUrl}/me`);

    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFailure(error.response.data.message));
  }
};

export const addTask = (title, description) => async (dispatch) => {
  try {
    dispatch(addTaskRequest());

    const { data } = await axios.post(
      `${serverUrl}/newtask`,
      {
        title,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(addTaskSuccess(data.message));
  } catch (error) {
    dispatch(addTaskFailure(error.response.data.message));
  }
};

export const updateTask = (taskId) => async (dispatch) => {
  try {
    dispatch({ type: "updateTaskRequest" });

    dispatch(updateTaskRequest());

    const { data } = await axios.get(`${serverUrl}/task/${taskId}`);

    dispatch(updateTaskSuccess(data.message));
  } catch (error) {
    dispatch(updateTaskFailure(error.response.data.message));
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch(deleteTaskRequest());

    const { data } = await axios.delete(`${serverUrl}/task/${taskId}`);
    dispatch(deleteTaskSuccess(data.message));
  } catch (error) {
    dispatch(deleteTaskFailure(error.response.data.message));
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const { data } = await axios.put(`${serverUrl}/updateprofile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(updateProfileSuccess(data.message));
  } catch (error) {
    dispatch(updateProfileFailure(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    await axios.get(`${serverUrl}/logout`);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error.response.data.message));
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const { data } = await axios.post(`${serverUrl}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("data", data);
    dispatch(registerSuccess(data.message));
  } catch (error) {
    console.log("error", error);
    dispatch(registerFailure(error.response.data.message));
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch(updatePasswordRequest());

      const { data } = await axios.put(
        `${serverUrl}/updatepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(updatePasswordSuccess(data.message));
    } catch (error) {
      dispatch(updatePasswordFailure(error.response.data.message));
    }
  };

export const verify = (otp) => async (dispatch) => {
  try {
    dispatch(verificationRequest());

    const { data } = await axios.post(
      `${serverUrl}/verify`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(verificationSuccess(data.message));
  } catch (error) {
    dispatch(verificationFailure(error.response.data.message));
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgetPasswordRequest());

    const { data } = await axios.post(
      `${serverUrl}/forgetpassword`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(forgetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgetPasswordFailure(error.response.data.message));
  }
};

export const resetPassword = (otp, newPassword) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const { data } = await axios.put(
      `${serverUrl}/resetpassword`,
      { otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(resetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(resetPasswordFailure(error.response.data.message));
  }
};
