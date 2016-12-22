/**
 * Created by Lennart on 20-11-16.
 */

import $ from 'jquery';
import _ from 'underscore';
import {View} from 'backbone';

/**
 * This view contains a table where the annotations are shown. This is a readable overview of the annotations.
 */
export default class AnnotationsListView extends View {
    initialize() {
        this.template = _.template($('#template-list').html());
        let self = this;
        this.collection.fetch({
            success: function () {
                self.render();
            }
        });
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