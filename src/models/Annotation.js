/**
 * Created by Lennart on 20-11-16.
 */

import {Model} from 'backbone';

/**
 * One model for an annotation
 */
export default class Annotation extends Model {

    defaults() {
        return {
            title: "backbone",
            description: "test",
            color: "red",
            size: 25,
            coordinate_x: 50,
            coordinate_y: 50
        };
    }
}