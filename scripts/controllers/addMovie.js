export default async function addMovie() {
  this.partials = {
    header: await this.load('../../templates/common/header.hbs'),
    footer: await this.load('../../templates/common/footer.hbs'),
    addMovieForm: await this.load('../../templates/addMovie/addMovieForm.hbs'),
  };
  this.partial('../../templates/addMovie/addMovie.hbs', this.app.userData);
}
