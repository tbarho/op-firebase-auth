import SigninController from 'op-firebase-auth/controllers/signin';

export default SigninController.extend({
  actions: {
    signinByEmail: function() {
      this.set('errorsText', []);

      if (!this.get('isValid')) {
        return this.displayErrors();
      }

      var email = this.get('email'),
          password = this.get('password');
      
      return this.get('session').authenticate('authenticator:firebase', {
        email: email, password: password
      });
    }
  }
});
