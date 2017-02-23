var fs = require('fs'),
  path = require('path'),
  del = require('del'),
  log = require('debug')('link-helper'),
  child_process = require('child_process'),
  mkdirp = require('mkdirp');

function createJunctionCmd(src, target) {
  return `mklink /D "${target}" "${src}"`;
}

function canCreateSymlinks() {
  const
    src = path.resolve('__test_source__'),
    dst = path.resolve('__test_target__'),
    target = path.join(dst, '__test_link_target__'),
    sub = path.join(src, '__test_sub__')
  try {
    const cmd = createJunctionCmd(src, target);
    log(`attempt to create link with command: ${cmd}`);
    mkdirp.sync(sub);
    mkdirp.sync(dst);
    child_process.execSync(cmd);
    return true;
  } catch (e) {
    console.log('directory junctions no worky: ', e);
    return false;
  } finally {
    log('cleaning up test link artifacts...');
    Promise.all([
      del(src),
      del(dst)
    ]).then(() => log('link artifacts cleaned up!'));
  }
}

function mklink(src, target) {
  src = path.resolve(src);
  target = path.resolve(target);
  return new Promise((resolve, reject) => {
    const cmd = createJunctionCmd(src, target);
    child_process.exec(cmd, (err) => {
      if (err) {
        reject('err');
      } else {
        resolve(`link created: ${src} => ${target}`);
      }
    });
  });
};

function createSymlink(src, dst) {
  del(dst)
  .then(function() {
    var parent = path.dirname(dst);
    return mkdirp(parent);
  })
  .then(function () {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(dst)) {
        return reject(`${dst} exists (and apparently not removable)!`);
      }
      mklink(src, dst);
    });
  });
}

module.exports = {
  createSymlink: createSymlink,
  canCreateSymlinks: canCreateSymlinks
};