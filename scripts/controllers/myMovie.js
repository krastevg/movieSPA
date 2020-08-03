export default async function myMovies() {
  this.partials = {
    header: await this.load('../../templates/common/header.hbs'),
    footer: await this.load('../../templates/common/footer.hbs'),
    myMovie: await this.load('../../templates/myMovies/myMovie.hbs'),
  };
  this.partial('../../templates/myMovies/myMovies.hbs', this.app.userData);
}
