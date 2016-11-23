/**
 * Created by Lennart on 20-11-16.
 */

import Backbone from 'backbone';
import AppRouter from './routers/AppRouter';

// class Events extends Backbone.Events {
//
// }

let init = () => {
    var router = new AppRouter();
    Backbone.history.start();

    router.navigate('app', {trigger: true});
};

init();

