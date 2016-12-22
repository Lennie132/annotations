/**
 * Created by Lennart on 11-12-16.
 */

import {View} from 'backbone';

/**
 * This is a navigation item with an event to navigate
 */
export default class NavigationView extends View {

    events() {
        return {
            "click .nav-item": "navigate"
        };
    }

    tagName() {
        return "li";
    }

    /**
     * Navigate to the chosen page
     * @param event
     */
    navigate(event) {
        event.preventDefault();
        Backbone.history.navigate(this.model.get('href'), true);
    }

    render() {
        this.$el.html('<a href="' + this.model.get('href') + '" class="nav-item">' + this.model.get('title') + '</a>');

        return this;
    }

}