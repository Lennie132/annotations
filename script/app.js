/**
 * Created by Lennart on 20-11-16.
 */


//import Backbone from 'backbone';
import Router from './router';

// class Events extends Backbone.Events {
//
// }

let init = () => {

    var router = new Router();
    Backbone.history.start();

    router.navigate('app', {trigger: true});
};

init();

