var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('heroku-wordpress generator', function () {

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withPrompts({themeName: 'test-press'})
      .on('end', done);
  });

  it('create expexted files', function () {
    assert.file([
      '.gitignore',
      'Vagrantfile',
      'gulpfile.js',
      'src/index.php',
      'src/header.php',
      'src/footer.php',
      'src/styles/style.scss',
      'src/functions.php',
      'wordpress',
      'wordpress/.htaccess',
      'wordpress/conf/nginx.conf.erb',
      'ansible/playbook.yml',
      'ansible/group_vars/all',
      'ansible/roles/apache/tasks/main.yml',
      'ansible/roles/common/files/bash_profile',
      'ansible/roles/common/tasks/main.yml',
      'ansible/roles/mysql/files/my.cnf',
      'ansible/roles/mysql/tasks/main.yml',
      'ansible/roles/peco/files/config.json',
      'ansible/roles/peco/tasks/main.yml',
      'ansible/roles/php/tasks/main.yml',
      'ansible/roles/phpmyadmin/files/config.inc.php',
      'ansible/roles/phpmyadmin/tasks/main.yml',
      'ansible/roles/wordpress/tasks/main.yml',
      'ansible/roles/wordpress/templates/wp-config.php',
      'ansible/roles/wp-cli/tasks/main.yml',
      'ansible/roles/wp-cli/files/config.yml'
    ]);

    assert.fileContent('ansible/group_vars/all', 'vagrant_ip: 192.168.33.10');
    assert.fileContent('Vagrantfile', 'ip: "192.168.33.10"');
    assert.fileContent('gulpfile.js', "dest: 'wordpress/wp-content/themes/test-press");
    assert.fileContent('src/styles/style.scss', 'Theme Name: test-press');
  });
});
