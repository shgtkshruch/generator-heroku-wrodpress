var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

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
  },

  wordpress: function () {
    mkdirp('wordpress');
    this.copy('htaccess', 'wordpress/.htaccess');
    mkdirp('wordpress/conf');
    this.fs.copy(
      this.templatePath('nginx.conf.erb'),
      this.destinationPath('wordpress/conf/nginx.conf.erb')
    );
  }

});
