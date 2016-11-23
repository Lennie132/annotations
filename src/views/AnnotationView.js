/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';

export default class AnnotationView extends View {
    initialize() {
        //console.log("init: annotation view");
        this.model.on("change", () => this.render(), this);
        this.template = _.template($('#template-annotation').html());

        var data = {
            title: "Via backbone yesss",
            description: "Deze is in backbone aangemaakt door initialize",
            color: "yellow",
            coordinate_x: 66,
            coordinate_y: 66
        };

        // this.model.save(data, {
        //     success: function(model, response) {
        //         console.log(model);
        //         console.log(response);
        //         //o.render();
        //         console.log('success');
        //     },
        //     error: function(model, response) {
        //         console.log(model);
        //     }
        //      //wait: true // Add this
        // });
    }

    tagName() {
        return "div";
    }

    className() {
        return "annotation";
    }

    events() {
        return {
            "click": "onClick"
        };
    }

    render() {
        this.setDemensions();
        //this.setPosition();
        this.setColor();

        var data = {
            color: this.model.get('size')
        };
        this.$el.html(this.template(data));
        return this;
    }


    setDemensions() {
        this.$el.css({
            width: this.model.get('size') + 'px',
            height: this.model.get('size') + 'px'
        });
    }

    setPosition() {
        var position = this.model.get('position');
        this.$el.css({
            left: position.x,
            top: position.y
        })
    }

    setColor() {
        this.$el.css({"background-color": this.model.get('color')});
    }

    onClick() {
        console.log("click: annotation");
        this.model.set("color", "orange");
    }
}