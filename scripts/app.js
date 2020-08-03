import home from './controllers/home.js';
import login, { loginPost } from './controllers/login.js';
import logout from './controllers/logout.js';
import register, { registerPost } from './controllers/register.js';
import myMovies from './controllers/myMovie.js';
import catalog from './controllers/catalog.js';
import addMovie from './controllers/addMovie.js';
import editMovie from './controllers/editMovie.js';
import details from './controllers/details.js';
window.addEventListener('load', () => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');
    this.userData = {
      username: '',
      userId: '',
    };
    this.get('/', home);
    this.get('index.html', home);
    this.get('#/home', home);
    this.get('#/login', login);
    this.post('#/login', (ctx) => {
      loginPost.call(ctx);
    });
    this.get('#/register', register);
    this.post('#/register', (ctx) => {
      registerPost.call(ctx);
    });
    this.get('#/myMovies', myMovies);
    this.get('#/catalog', catalog);
    this.get('#/addMovie', addMovie);
    this.get('#/editMovie/:id', editMovie);
    this.get('#/details/:id', details);
    this.get('#/logout', logout);
  });

  app.run();
});
