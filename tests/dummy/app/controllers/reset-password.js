import Ember from 'ember';
import ResetPasswordController from 'op-firebase-auth/controllers/reset-password';

export default ResetPasswordController.extend({
  actions: {
    resetPassword: function() {
      this.set('resetPasswordError', null);
      this.set('errorsText', []);

      if (!this.get('isValid')) {
        return this.displayErrors();
      }

      var newPassword = this.get('newPassword'),
          email = this.get('userEmail'),
          resetCode = this.get('resetCode'),
          self = this;

      new Ember.RSVP.Promise(function(resolve, reject) {
        self.firebase.changePassword({
          email: email,
          oldPassword: resetCode,
          newPassword: newPassword
        }, function(error) {
          if (error === null) {
            resolve();
          } else {
            reject(error);
          }
        });
      }).then(function() {
        return self.get('session').authenticate('authenticator:firebase', {
          email: email, password: newPassword
        });
      });
    }
  }
});
