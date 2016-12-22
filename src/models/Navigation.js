/**
 * Created by Lennart on 20-11-16.
 */

import {Model} from 'backbone';

/**
 * One model for an menu item
 */
export default class Navigation extends Model {

    defaults() {
        return {
            title: "Menu item",
            href: "link"
        };
    }
}