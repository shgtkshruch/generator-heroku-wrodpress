var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('heroku-wordpress generator', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .on('end', done);
  });

  it('create expexted files', function () {
    assert.file([
      '.gitignore',
      'Vagrantfile'
    ]);
  });
});
