/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import Annotation from '../models/Annotation';
import AnnotationView from './AnnotationView';


export default class AnnotationsView extends View {
    initialize() {
        this.template = _.template($('#template-canvas').html());
        var self = this;
        this.collection.fetch({
            success: function () {
                self.render(); // Render after loading
            }
        });
    }

    events() {
        return {
            "click #add-annotation": "createAnnotation"
        };
    }

    tagName() {
        return "div";
    }

    id() {
        return "canvas-wrapper";
    }

    createAnnotation() {
        console.log("add annotation");

        this.collection.create({
            color: 'green'
        });
        this.render();
    }

    render() {
        var data = {
            addButton: "Voeg annotatie toe"
        };

        this.$el.html((this.template(data)));

        this.collection.each((model) => {
            var annotation = new AnnotationView({model: model});
            $('#canvas').append(annotation.render().el);
        });
        return this;
    }

}