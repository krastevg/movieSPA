export default async function editMovie() {
  this.partials = {
    header: await this.load('../../templates/common/header.hbs'),
    footer: await this.load('../../templates/common/footer.hbs'),
    editMovieForm: await this.load(
      '../../templates/editMovie/editMovieForm.hbs'
    ),
  };
  this.partial('../../templates/editMovie/editMovie.hbs', this.app.userData);
}
