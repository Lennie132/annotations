/**
 * Created by Lennart on 17-11-16.
 */

import {Collection} from "backbone";
import Annotation from '../models/Annotation';

export default class Annotations extends Collection {
    constructor(options) {
        super(options);
        this.url = "http://lennartv.nl/api/";
        this.model = Annotation;
    }

    parse(data) {
        return data.items;
    }
}