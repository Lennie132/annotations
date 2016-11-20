/**
 * Created by Lennart on 20-11-16.
 */

import Annotations from './annotations';
import AnnotationsView from './annotationsView';
import Annotation from './annotation';
import Clock from './clock';

export default class Router extends Backbone.Router {
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
        var annotationsView = new AnnotationsView({collection:annotations});
        //annotations.create({title: "Via collection", description: "jippie", color: "pink", coordinate_x: 20, coordinate_y: 20});
        annotations.fetch();
        $('#app').append(annotationsView.render().el);
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
        // _(models).each(function (model) {
        //     $('#app').append(new AnnotationView({model: model}).render().el);
        // });
    }

    clock() {
        $('#app').append(new Clock().render().el);
    }
}