var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  git: function () {
    this.copy('gitignore', '.gitignore');
  },

  vagrant: function () {
    this.vagrantIp = '192.168.33.10';
    this.copy('Vagrantfile', 'Vagrantfile');
  },

  ansible: function () {
    this.directory('ansible', 'ansible');
    this.template('ansible/group_vars/all', 'ansible/group_vars/all');
  }
});
