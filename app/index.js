var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'themeName',
      message: 'What is your theme name?',
      value: 'themeName'
    }];

    this.prompt(prompts, function(answers) {
      this.themeName = answers.themeName;
      done();
    }.bind(this));
  },

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
    mkdirp('wordpress/wp-content/themes/' + this.themeName);
    this.copy('htaccess', 'wordpress/.htaccess');
    mkdirp('wordpress/conf');
    this.fs.copy(
      this.templatePath('nginx.conf.erb'),
      this.destinationPath('wordpress/conf/nginx.conf.erb')
    );
  },

  app: function () {
    this.copy('index.php', 'src/index.php');
    this.copy('header.php', 'src/header.php');
    this.copy('footer.php', 'src/footer.php');
    this.template('style.scss', 'src/styles/style.scss');
    this.copy('functions.php', 'src/functions.php');
  },

  gulp: function () {
    this.copy('gulpfile.js', 'gulpfile.js');
  }
});
