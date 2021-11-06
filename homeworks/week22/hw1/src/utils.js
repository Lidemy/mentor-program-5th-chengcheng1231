import Swal from 'sweetalert2'
const TOKEN_NAME = 'token'

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token)
}

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}

export const successAlert = (title, text, icon) => {
  Swal.fire({
    title,
    text,
    icon
  });
};