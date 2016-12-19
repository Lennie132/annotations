/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';
import AnnotationView from './AnnotationView';

/**
 * This view contains a form to create a new annotation and a canvas where the annotations are shown. These are shown as dots.
 */
export default class AnnotationsView extends View {
    initialize() {
        this.template = _.template($('#template-list').html());
        let self = this;
        this.collection.fetch({
            success: function () {
                self.render();
            }
        });
    }

    events() {
    }

    tagName() {
        return "table";
    }

    id() {
        return "annotations-list";
    }

    className() {
        return "table table-striped";
    }

    render() {
        let data = {
            collection: this.collection
        };

        this.$el.html((this.template(data)));

        return this;
    }

}