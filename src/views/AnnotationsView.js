/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import AnnotationView from './AnnotationView';

/**
 * This view contains a form to create a new annotation and a canvas where the annotations are shown. These are shown as dots.
 */
export default class AnnotationsView extends View {
    initialize(options) {
        this.background_src = options.background_src;
        this.template = _.template($('#template-canvas').html());
        let self = this;
        this.collection.fetch({
            success: function () {
                self.render();
            }
        });

        Backbone.on('changeBackground',(src) => {
            this.changeBackground(src);
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

    /**
     * Create a new annotation, check the input fields and save it in the collection
     */
    createAnnotation() {
        let title = this.$('#annotation-title').val();
        let description = this.$('#annotation-description').val();
        let color = this.$('#annotation-color').val();

        if (title == "") {
            title = "new Annotation";
        }

        if (description == "") {
            description = "description of this annotation";
        }

        this.collection.create({
            title: title,
            description: description,
            color: color
        });
        this.render();
    }

    /**
     * The custom event gives a source of an image, save this and render the canvas again
     * @param src
     */
    changeBackground(src) {
        this.background_src = src;
        this.render();
    }

    render() {
        let data = {
            addButton: "Add annotation",
            background_src: this.background_src
        };

        this.$el.html((this.template(data)));

        this.collection.each((model) => {
            let annotation = new AnnotationView({model: model});
            $('#canvas').append(annotation.render().el);
        });
        return this;
    }

}