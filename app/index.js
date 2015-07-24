var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'themeName',
      message: 'What is your theme name?',
      value: 'themeName'
    }, {
      type: 'input',
      name: 'herokuAppName',
      message: 'What is your heroku app name?',
      value: 'herokuAppName'
    }];

    this.prompt(prompts, function(answers) {
      this.themeName = answers.themeName;
      this.herokuAppName = answers.herokuAppName;
      done();
    }.bind(this));
  },

  writing: {
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
      mkdirp('wordpress/wp-content/themes/' + this.themeName);
      this.copy('htaccess', 'wordpress/.htaccess');
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
      this.template('package.json', 'package.json', {name: _s.slugify(this.appname)});
      this.copy('gulpfile.js', 'gulpfile.js');
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  },

  end: function () {

    if (!this.options['skip-vagrant']) {
      this.spawnCommandSync('vagrant', ['up']);
    }

    if (!this.options['skip-heroku']) {
      this.spawnCommandSync(
        'heroku',
        ['create', this.herokuAppName, '-s', 'cedar', '-b', 'git://github.com/iphoting/heroku-buildpack-php-tyler.git']
      );
      this.spawnCommandSync(
        'heroku',
        ['addons:create', 'cleardb:ignite', '-a', this.herokuAppName]
      );
    }
  }
});
