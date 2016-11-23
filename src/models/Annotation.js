/**
 * Created by Lennart on 20-11-16.
 */

//import Backbone from 'backbone';

export default class Annotation extends Backbone.Model {
    initialize() {
        //console.log("init: annotation model");
    }

    defaults() {
        return {
            color: "red",
            size: 25
        };
    }
}