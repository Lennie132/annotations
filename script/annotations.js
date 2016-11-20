/**
 * Created by Lennart on 17-11-16.
 */

//import Backbone from "backbone";

import Annotation from './annotation';

export default class Annotations extends Backbone.Collection {
    constructor(options) {
        super(options);
        this.url = "https://stud.hosted.hr.nl/0893738/api/annotations/";

        this.model = Annotation;
    }

    parse(data) {
        return data.items;
    }
}