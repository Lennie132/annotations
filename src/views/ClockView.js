/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';

export default class ClockView extends View {
    initialize() {
        //console.log("init: clock view");

        this.template = _.template($('#template-clock').html());
    }

    tagName() {
        return "div";
    }

    className() {
        return "clock";
    }

    render() {
        var date = new Date();
        var data = {
            hours: ("0" + date.getHours()).slice(-2),
            minutes: ("0" + date.getMinutes()).slice(-2),
            seconds: ("0" + date.getSeconds()).slice(-2)
        };

        this.$el.html(this.template(data));
        setTimeout(() => this.render(), 1000);
        return this;
    }
}