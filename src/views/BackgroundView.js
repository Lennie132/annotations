/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';

export default class BackgroundView extends View {
    initialize() {
        this.template = _.template($('#template-background').html());
    }

    events() {
        return {
            "change .background__src": "changeBackground"
        }
    }

    tagName() {
        return "div";
    }

    className() {
        return "background__wrapper";
    }

    changeBackground() {
        this.model.set('src', this.$('.background__src').val());
        Backbone.trigger('changeBackground', this.model.get('src'));
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
}