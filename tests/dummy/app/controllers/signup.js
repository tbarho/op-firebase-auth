import Ember from 'ember';
import SignupController from 'op-firebase-auth/controllers/signup';

export default SignupController.extend({
  actions: {
    signupByEmail: function() {
      this.set('errorsText', []);

      if (!this.get('isValid')) {
        return this.displayErrors();
      }

      var ref = this.get('firebase'),
          email = this.get('email'),
          password = this.get('password'),
          self = this;
      
      new Ember.RSVP.Promise(function(resolve, reject) {
        ref.createUser({
          email: email,
          password: password
        }, function(error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }).then(function() {
        return self.get('session').authenticate('authenticator:firebase', {
          email: email, password: password
        });
      });
    }
  }
});
