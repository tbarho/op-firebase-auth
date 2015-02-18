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
    password: {
      presence: true
    },
  },

  email: null,
  password: null,

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
  displayLoginError: function(err) {
    var errorMessage;
    switch (err.code) {
      case 'INVALID_USER':
        errorMessage = 'You don\'t have an account yet. Please sign up first.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password. Try typing it again.';
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
    this.set('signinError', errorMessage);
  },
});