/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import {Router} from 'backbone';
import Annotations from '../collections/Annotations';
import AnnotationsView from '../views/AnnotationsView';
import AnnotationsListView from '../views/AnnotationsListView';
import NavigationView from '../views/NavigationView';
import ClockView from '../views/ClockView';

/**
 * Router for the navigation between pages
 */
export default class AppRouter extends Router {
    routes() {
        return {
            "annotations": "annotations",
            "clock": "clock",
            "app": "app"
        };
    }

    initialize() {
        let navigation = new NavigationView(this);
        $('#navigation').prepend(navigation.render().el);
    }

    app() {
        let annotations = new Annotations();
        let annotationsView = new AnnotationsView({collection: annotations});

        $('#app').html(annotationsView.render().el);
    }

    annotations() {
        let annotations = new Annotations();
        let annotationsListView = new AnnotationsListView({collection: annotations});

        $('#app').html(annotationsListView.render().el);
    }

    clock() {
        $('#app').html(new ClockView().render().el);
    }

}