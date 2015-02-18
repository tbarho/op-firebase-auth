
module.exports = {
  normalizeEntityName: function() {
  },

  afterInstall: function() {
    var self = this;
    return this.addBowerPackageToProject('emberfire', '1.3.2').then(function() {
      return self.addBowerPackageToProject('ember-simple-auth', '0.7.3');
    });
  }
};