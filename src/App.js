/**
 * Created by Lennart on 20-11-16.
 */

import Backbone from 'backbone';
import AppRouter from './routers/AppRouter';

/**
 * The app is created here, via the router the content is shown
 */
let init = () => {
    let router = new AppRouter();
    Backbone.history.start();

    router.navigate('app', {trigger: true});
};

init();

