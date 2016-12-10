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
        this.mousedown = false;
        this.positionchanged = false;
    }

    tagName() {
        return "div";
    }

    className() {
        return "annotation";
    }

    events() {
        return {
            "click": "openDetails",
            "click .annotation__delete": "delete",
            "mousedown": "moveStart",
            "mouseup": "moveStop",
            "mouseout": "moveStop",
            "mousemove": "moveElement"
        };
    }

    render() {
        this.setSize(this.model.get('size'));
        this.setPosition(this.model.get('coordinate_x'), this.model.get('coordinate_y'));
        this.setColor();

        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

    delete() {
        this.model.destroy();
        this.remove();
    }

    moveStart() {
        this.mousedown = true;
    }

    moveStop(event) {
        this.mousedown = false;
        if (this.positionchanged) {
            let position = this.getPosition(event);
            this.model.save({coordinate_x: position.x, coordinate_y: position.y});
            this.positionchanged = false;
        }
    }

    moveElement(event) {
        if (this.mousedown) {
            let position = this.getPosition(event);
            this.setPosition(position.x, position.y);
            this.positionchanged = true;
        }
    }

    setColor() {
        this.$el.addClass("annotation--" + this.model.get('color'));
    }

    setSize(size) {
        this.$el.css({
            width: size + 'px',
            height: size + 'px'
        });
    }

    /**
     * Sets the position on the canvas
     * @param x
     * @param y
     */
    setPosition(x, y) {
        this.$el.css({
            left: x + '%',
            top: y + '%'
        });
    }

    /**
     * Gives the position of the annotation relative to the canvas
     * @param event
     * @returns {{x: number, y: number}}
     */
    getPosition(event) {
        const canvas = $("#canvas");

        // relative position in pixels
        let relativeX = event.clientX - canvas.offset().left - this.$el.width() / 2;
        let relativeY = event.clientY - canvas.offset().top - this.$el.height() / 2;

        // relative position in procenten
        let x = (relativeX / canvas.width() * 100);
        let y = (relativeY / canvas.height() * 100);

        return {x: x, y: y};
    }

    openDetails() {
        this.$('.annotation__popup').toggleClass("annotation__popup--visible");
    }
}