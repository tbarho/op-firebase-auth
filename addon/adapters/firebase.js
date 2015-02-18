import DS from 'ember-data';
import config from '../config/environment';

/* globals Firebase */

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase(config.firebase_url)
});
