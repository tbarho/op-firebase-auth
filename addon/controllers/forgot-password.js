import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {

  validations: {
    email: {
      presence: true,
      format: {
        with: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'invalid email'  
      }
    },
  },

  email: null,

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
        errorMessage = 'Email not registered. Maybe you signed up with a different one?';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'There is something wrong with the provided email.';
        break;
      case 'NETWORK_ERROR':
        errorMessage = 'There is a problem with your network connection';
        break;
      default:
        errorMessage = 'Something went wrong :/';
    }
    this.set('forgotPasswordError', errorMessage);
  },
});
