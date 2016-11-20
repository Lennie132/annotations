/**
 * Created by Lennart on 20-11-16.
 */

import Annotation from './annotation';
import AnnotationView from './annotationView';


export default class AnnotationsView extends Backbone.View {
    initialize() {
        //console.log("init: canvas view");
        this.template = _.template($('#template-canvas').html());
    }

    events() {
        return {
            "click #add-annotation": "makeRectangle"
        };
    }

    tagName() {
        return "div";
    }

    id() {
        return "canvas-wrapper";
    }

    render() {
        var data = {
            addButton: "Voeg annotatie toe",
            collection: this.collection
        };


        this.$el.html((this.template(data)));
        return this;
    }

    makeRectangle() {
        console.log("add annotation");



        var block = new AnnotationView({
            model: new Annotation(
                {
                    color: 'green'
                }
            )
        });
        $("#canvas").append(block.render().el);
    }
}