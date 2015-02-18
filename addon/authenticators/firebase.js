import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

/**
 * Custom ember-simple-auth authenticator to support firebase login
 */
export default Base.extend({

  restore: function(data) {
    var ref = this.get('firebase');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var authData = ref.getAuth();
      if (authData) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  },

  authenticate: function(options) {
    var ref = this.get('firebase');
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ref.authWithPassword({
        email: options.email,
        password: options.password
      }, function(error, authData) {
        if (error) {
          reject(error);
        } else {
          resolve(authData);
        }
      });
    });
  },

  invalidate: function(/* data */) {
    var ref = this.get('firebase');
    return new Ember.RSVP.Promise(function(resolve /* , reject */) {
      ref.unauth();
      resolve();
    });
  }

});