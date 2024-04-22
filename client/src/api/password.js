import axios from "./axios";

export const forgotPasswordRequest = (email) => axios.post('/forgot-password', email);

export const verifyTokenResetRequest = (id, resetToken) => axios.get(`/reset-password/${id}/${resetToken}`);

export const resetPasswordRequest = (id, resetToken, newPassword) => axios.put(`/reset-password/${id}/${resetToken}`, newPassword);