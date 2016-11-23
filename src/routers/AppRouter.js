/**
 * Created by Lennart on 20-11-16.
 */
import $ from 'jquery';
import _ from 'underscore';
import {Router} from 'backbone';
import Annotations from '../collections/Annotations';
import AnnotationsView from '../views/AnnotationsView';
import AnnotationView from '../views/AnnotationView';
import Annotation from '../models/Annotation';
import ClockView from '../views/ClockView';

export default class AppRouter extends Router {
    routes() {
        return {
            "annotations": "annotations",
            "clock": "clock",
            "app": "app"
        };
    }

    app() {
        var models = [
            new Annotation({
                size: 40
            }),
            new Annotation({
                size: 30
            }),
            new Annotation({
                size: 20
            })
        ];

        var annotations = new Annotations(models);
        var annotationsView = new AnnotationsView({collection: annotations});
        //annotations.fetch();
        $('#app').html(annotationsView.render().el);
    }

    annotations() {
        var models = [
            new Annotation({
                size: 40
            }),
            new Annotation({
                size: 30
            }),
            new Annotation({
                size: 20
            })
        ];

        var annotations = new Annotations(models);
        console.log(annotations);
        $('#app').empty();
        _(models).each(function (model) {
            $('#app').append(new AnnotationView({model: model}).render().el);
        });
    }

    clock() {
        $('#app').html(new ClockView().render().el);
    }

}