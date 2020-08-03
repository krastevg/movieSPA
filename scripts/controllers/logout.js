import { logout as logoutGet } from '../data.js';
export default async function logout() {
  console.log(this.params);
  try {
    const result = await logoutGet();
    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
    this.app.userData.username = '';
    this.app.userData.userId = '';

    this.redirect('#/home');
  } catch (err) {
    alert(err.message);
  }
}
