/**
 * Created by Lennart on 11-12-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';

export default class NavigationView extends View {
    initialize(router) {
        this.router = router;
        this.pages = [
            {href: "app", title: "App"},
            {href: "annotations", title: "Annotations"},
            {href: "clock", title: "Clock"}
        ];
    }

    events() {
        return {
            "click .nav-item": "navigate"
        };
    }

    tagName() {
        return "ul";
    }
    id() {
        return "navigation";
    }

    className() {
        return "nav navbar-nav";
}

    navigate(event) {
        let link = $(event.target).data('link');
        event.preventDefault();
        this.router.navigate(link, {trigger: true});
    }

    render() {
        this.$el.html();

        this.pages.forEach((item) => {
            this.$el.append('<li><a data-link="' + item.href + '" class="nav-item">' + item.title + '</a></li>');
        });
        return this;
    }

}