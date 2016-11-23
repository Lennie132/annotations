/**
 * Created by Lennart on 20-11-16.
 */

import { View } from 'backbone';

export default class Clock extends View {
    initialize() {
        //console.log("init: clock view");
    }

    tagName() {
        return "div";
    }

    className() {
        return "clock";
    }

    render() {
        this.$el.html(new Date().toString());
        setTimeout(() => this.render(), 1000);

        return this;
    }

}