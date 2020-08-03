export default async function catalog() {
  this.partials = {
    header: await this.load('../../templates/common/header.hbs'),
    footer: await this.load('../../templates/common/footer.hbs'),
    catalogMovie: await this.load('../../templates/catalogMovie.hbs'),
  };
  this.partial('../../templates/catalog.hbs', this.app.userData);
}
