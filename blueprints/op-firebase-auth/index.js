module.exports = {
  normalizeEntityName: function() {
  },

  afterInstall: function() {
    this.addBowerPackageToProject('emberfire', '~0.0.0');
    return this.addBowerPackageToProject('ember-simple-auth', '0.7.3');
  }
};