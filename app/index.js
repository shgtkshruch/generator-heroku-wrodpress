var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  git: function () {
    this.copy('gitignore', '.gitignore');
  },

  vagrant: function () {
    this.copy('Vagrantfile', 'Vagrantfile');
  }
});
