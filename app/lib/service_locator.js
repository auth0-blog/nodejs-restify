'use strict';

function ServiceLocator() {
  this.dependencyMap = {};
  this.dependencyCache = {};
}

ServiceLocator.prototype.register = function (dependencyName, constructor) {
  if (typeof constructor !== 'function') {
    throw new Error(dependencyName + ': Dependency constructor is not a function');
  }

  if (!dependencyName) {
    throw new Error('Invalid depdendency name provided');
  }

  this.dependencyMap[dependencyName] = constructor;
};

ServiceLocator.prototype.get = function (dependencyName) {
  if (this.dependencyMap[dependencyName] === undefined) {
    throw new Error(dependencyName + ': Attempting to retrieve unknown dependency');
  }

  if (typeof this.dependencyMap[dependencyName] !== 'function') {
    throw new Error(dependencyName + ': Dependency constructor is not a function');
  }

  if (this.dependencyCache[dependencyName] === undefined) {
    const dependencyConstructor = this.dependencyMap[dependencyName];
    const dependency = dependencyConstructor(this);
    if (dependency) {
      this.dependencyCache[dependencyName] = dependency;
    }
  }

  return this.dependencyCache[dependencyName];
};

ServiceLocator.prototype.clear = function () {
  this.dependencyCache = {};
  this.dependencyMap = {};
};

module.exports = new ServiceLocator();
