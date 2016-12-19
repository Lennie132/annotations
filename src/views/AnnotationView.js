/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';

/**
 * This model is for the annotations. A annotation is shown as a dot which you can drag around. You can click on an
 * annotation to open a popup. There you can change the title, description and color. You can also delete the annotation
 * and close the popup.
 */
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
            "change .annotation__title": "changeTitle",
            "change .annotation__description": "changeDescription",
            "mousedown  .annotation__dot": "moveStart",
            "mouseup  .annotation__dot": "moveStop",
            "mouseout  .annotation__dot": "moveStop",
            "mousemove  .annotation__dot": "moveElement"
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

    /**
     * If mouse is down register this for moving functions
     */
    moveStart() {
        this.mousedown = true;
    }

    /**
     * If the mouse is down and moving, then change te position to the position of the mouse
     * @param event
     */
    moveElement(event) {
        if (this.mousedown) {
            let position = this.getPosition(event);
            this.setPosition(position.x, position.y);
            this.positionchanged = true;
        }
    }

    /**
     * If the mouse is up again and the position of the dot has changed, then save the new location
     * @param event
     */
    moveStop(event) {
        this.mousedown = false;
        if (this.positionchanged) {
            let position = this.getPosition(event);
            this.model.save({coordinate_x: position.x, coordinate_y: position.y});
            this.positionchanged = false;
        }
    }

    /**
     * If a new color is chosen, delete the class of the dot with the current color and
     * replace it with the new color class
     */
    setColor() {
        this.$el.removeClass((index, css) => {
            return (css.match(/\bannotation--\S+/g) || []).join(' ');
        });
        this.$el.addClass("annotation--" + this.model.get('color'));
    }

    /**
     * Save new chosen color
     * @param event
     */
    changeColor(event) {
        let color = $(event.target).data('color');
        this.model.save({color: color});
    }

    /**
     * Save new chosen title
     * @param event
     */
    changeTitle(event) {
        let title = $(event.target).val();
        this.model.save({title: title});
    }

    /**
     * Save new chosen description
     * @param event
     */
    changeDescription(event) {
        let description = $(event.target).val();
        this.model.save({description: description});
    }


    /**
     * Sets the size on the canvas
     * @param size
     */
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
     * Gives the position of the annotation relative to the canvas and checks if it is not outside the canvas
     * @param event
     * @returns {{x: number, y: number}}
     */
    getPosition(event) {
        const canvas = $("#canvas");
        let x, y;

        // relative position in pixels
        let relativeX = event.clientX - canvas.offset().left - this.$el.width() / 2;
        let relativeY = event.clientY - canvas.offset().top - this.$el.height() / 2;


        // relative position in percentage with check if the position is in the canvas
        if (relativeX > 0 && relativeX < (canvas.width() - this.$el.width())) {
            x = relativeX / canvas.width() * 100;
        } else {
            x = Number(this.$el.css('left').replace(/[^-\d\.]/g, '')) / canvas.width() * 100;
        }

        if (relativeY > 0 && relativeY < (canvas.height() - this.$el.height())) {
            y = relativeY / canvas.height() * 100;
        } else {
            y = Number(this.$el.css('top').replace(/[^-\d\.]/g, '')) / canvas.height() * 100;
        }

        return {x: x, y: y};
    }

    /**
     * Open detail popup
     */
    openDetails() {
        $(".annotation__details").removeClass("annotation__details--visible");
        this.$(".annotation__details").addClass("annotation__details--visible");
    }

    /**
     * Close detail popup
     */
    closeDetails() {
        this.$(".annotation__details").removeClass("annotation__details--visible");
    }
}