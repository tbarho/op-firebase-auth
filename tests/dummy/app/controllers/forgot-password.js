import ForgotPasswordController from 'op-firebase-auth/controllers/forgot-password';

export default ForgotPasswordController.extend({
  actions: {
    sendResetEmail: function() {
      this.set('errorsText', []);

      if (!this.get('isValid')) {
        return this.displayErrors();
      }
    }
  }
});
