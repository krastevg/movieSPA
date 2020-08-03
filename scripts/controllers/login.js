import { login as loginApi } from '../data.js';
export default async function login() {
  this.partials = {
    header: await this.load('../../templates/common/header.hbs'),
    footer: await this.load('../../templates/common/footer.hbs'),
    loginForm: await this.load('../../templates/login/loginForm.hbs'),
  };
  this.partial('../../templates/login/login.hbs', this.app.userData);
}

export async function loginPost() {
  console.log(this.params);
  try {
    const result = await loginApi(this.params.username, this.params.password);
    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
    this.app.userData.username = result.username;
    this.app.userData.userId = result.objectId;

    this.redirect('#/home');
  } catch (err) {
    alert(err.message);
  }
}
