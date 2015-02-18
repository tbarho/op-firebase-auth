import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {

  validations: {
    newPassword: {
      presence: true,
      length: { minimum: 8 }
    },
  },

  queryParams: ['userEmail', 'resetCode'],
  userEmail: null,
  resetCode: null,

  newPassword: null,

  /**
   * Copy first message from each error in the controller to errorsText for
   * display
   */
  displayErrors: function() {
    var errorsText = {};
    for(var error in this.errors) {
      if (this.errors.hasOwnProperty(error)) {
        errorsText[error] = this.errors[error].get('firstObject');
      }
    }
    this.set('errorsText', errorsText);
  },

  /**
   * Display custom error messages for the Firebase login errors to the user
   * @param  err [firebase error]
   */
  displayResetPasswordError: function(err) {
    var errorMessage;
    switch (err.code) {
      case 'INVALID_USER':
      case 'INVALID_PASSWORD':
      case 'INVALID_EMAIL':
        errorMessage = 'There was a problem with your reset link. Please ask for a new email.';
        break;
      case 'NETWORK_ERROR':
        errorMessage = 'There is a problem with your network connection';
        break;
      default:
        errorMessage = 'Something went wrong :/';
    }
    this.set('resetPasswordError', errorMessage);
  },
});
