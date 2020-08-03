import { register } from '../data.js';
export default async function register1() {
  this.partials = {
    header: await this.load('../../templates/common/header.hbs'),
    footer: await this.load('../../templates/common/footer.hbs'),
    registerForm: await this.load('../../templates/register/registerForm.hbs'),
  };
  this.partial('../../templates/register/register.hbs', this.app.userData);
}

export async function registerPost() {
  console.log(this.params);
  if (this.params.username.length < 3) {
    alert('Username needs to be at least 3 charecters long');
    return;
  }

  if (this.params.password.length < 6) {
    alert('Password needs to be at least 6 charecters long');
    return;
  }
  if (this.params.password !== this.params.repeatPassword) {
    alert('Passwords don`t match');
    return;
  }

  try {
    const result = await register(this.params.username, this.params.password);
    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }

    this.redirect('#/login');
  } catch (err) {
    alert(err.message);
  }
}
