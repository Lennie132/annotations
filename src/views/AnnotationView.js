/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';

export default class AnnotationView extends View {
    initialize() {
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
            "click .annotation__dot": "openDetails",
            "click .annotation__close-details": "closeDetails",
            "click .annotation__delete": "delete",
            "click .annotation__color": "changeColor",
            "mousedown": "moveStart",
            "mouseup": "moveStop",
            "mouseout": "moveStop",
            "mousemove": "moveElement"
        };
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.setSize(this.model.get('size'));
        this.setPosition(this.model.get('coordinate_x'), this.model.get('coordinate_y'));
        this.setColor();
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

    changeColor(event) {
        let color = $(event.target).data('color');
        this.model.save({color: color});
    }

    setSize(size) {
        this.$(".annotation__dot").css({
            width: size + 'px',
            height: size + 'px'
        });
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
        $('.annotation__details').removeClass("annotation__details--visible");
        this.$('.annotation__details').addClass("annotation__details--visible");
    }

    closeDetails() {
        this.$('.annotation__details').removeClass("annotation__details--visible");
    }
}