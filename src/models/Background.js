/**
 * Created by Lennart on 20-11-16.
 */

import {Model} from 'backbone';

/**
 * One model for using your own background image of the canvas
 */
export default class Background extends Model {

    defaults() {
        return {
            src: "https://stud.hosted.hr.nl/0893738/annotations/img/dessert.png"
        };
    }
}