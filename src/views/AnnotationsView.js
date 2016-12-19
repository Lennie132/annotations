/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import AnnotationView from './AnnotationView';


export default class AnnotationsView extends View {
    initialize() {
        this.template = _.template($('#template-canvas').html());
        let self = this;
        this.collection.fetch({
            success: function () {
                self.render();
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

    render() {
        let data = {
            addButton: "Voeg annotatie toe"
        };

        this.$el.html((this.template(data)));

        this.collection.each((model) => {
            let annotation = new AnnotationView({model: model});
            $('#canvas').append(annotation.render().el);
        });
        return this;
    }

}