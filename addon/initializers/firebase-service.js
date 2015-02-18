export function initialize(container, application) {
  /**
   * Inject the firebase ref created on the FirebaseAdapter into the routes
   * and the authenticator. Makes more sense to create it here and inject it
   * to the adapter but the adapter is initialized before the ember cli
   * initializers are called. Emberfire is not a real ember cli addon.
   *
   * It's important to have just one Firebase ref on the app to avoid bugs
   * mocking it on the tests.
   */
  var ref = container.lookup('adapter:firebase').get('firebase');
  application.register('service:firebase', ref, { instantiate: false });
  application.inject('route', 'firebase', 'service:firebase');
  application.inject('model', 'firebase', 'service:firebase');
  application.inject('controller', 'firebase', 'service:firebase');
  application.inject('component', 'firebase', 'service:firebase');
  application.inject('authenticator', 'firebase', 'service:firebase');
}

export default {
  name: 'firebase-service',
  after: 'simple-auth',
  initialize: initialize
};