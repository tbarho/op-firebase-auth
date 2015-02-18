import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default ApplicationRouteMixin.reopen({
  init: function() {
    this.firebase.onAuth(this.handleFirebaseSessionChange.bind(this));
    this._super();
  },

  /**
   * Make sure that when the firebase session is invalidated the local session
   * is also invalidated, and that the user is redirected to the signup route
   */
  handleFirebaseSessionChange: function(authData) {
    if (!authData && this.session && this.session.isAuthenticated) {
      this.session.invalidate();
    }
  },

  willDestroy: function() {
    this.firebase.offAuth(this.handleFirebaseSessionChange);
    this._super();
  },

  actions: {
    /**
     * Run after the session has been invalidated by ember-simple-auth. Check
     * if the app is running inside cordova or not to reload to the correct
     * url.
     *
     * Reloading is a safe way to clear all in memory data.
     */
    sessionInvalidationSucceeded: function() {
      if (!Ember.testing) {
        var inCordovaApp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        if (inCordovaApp) {
          window.location.replace('index.html');
        } else {
          window.location.replace('/');
        }
      }
    },
  }
});
