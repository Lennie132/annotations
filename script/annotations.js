/**
 * Created by Lennart on 17-11-16.
 */

//import Backbone from "backbone";

class Annotation extends Backbone.Model {
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

class AnnotationView extends Backbone.View {
    initialize() {
        //console.log("init: annotation view");
        this.model.on("change", () => this.render(), this);
    }

    tagName() {
        return "div";
    }

    className() {
        return "annotation";
    }

    events() {
        return {
            "click": "onClick"
        };
    }

    render() {
        this.setDemensions();
        //this.setPosition();
        this.setColor();

        return this;
    }


    setDemensions() {
        this.$el.css({
            width: this.model.get('size') + 'px',
            height: this.model.get('size') + 'px'
        });
    }

    setPosition() {
        var position = this.model.get('position');
        this.$el.css({
            left: position.x,
            top: position.y
        })
    }

    setColor() {
        this.$el.css({"background-color": this.model.get('color')});
    }

    onClick() {
        console.log("click: annotation");
        this.model.set("color", "orange");
    }
}

class Annotations extends Backbone.Collection {
    constructor(options) {
        super(options);
        this.model = Annotation;
    }
}

class Canvas extends Backbone.Model {
    initialize() {
        //console.log("init: canvas model");
    }
}

class CanvasView extends Backbone.View {
    initialize() {
        //console.log("init: canvas view");
    }

    events() {
        return {
            "click": "makeRectangle"
        };
    }

    tagName() {
        return "div";
    }

    id() {
        return "canvas";
    }

    render() {
        return this;
    }

    makeRectangle() {
        console.log("click: canvas");
        var block = new AnnotationView({
            model: new Annotation(
                {
                    color: 'green'
                }
            )
        });
        $("#canvas").append(block.render().el);
    }
}

class ButtonView extends Backbone.View {

    id() {
        return "addButton";
    }

    tagName() {
        return "button";
    }

    events() {
        return {
            "click": ""
        };
    }

    render() {
        this.$el.html("Een knop");
        return this;
    }

}

class Router extends Backbone.Router {
    routes() {
        return {
            "annotations": "annotations",
            "clock": "clock",
            "app": "app"
        };
    }

    app() {
        $('#app').append(new CanvasView({model: new Canvas()}).render().el);

        $('#app').append(new ButtonView().render().el);
    }

    annotations() {
        var models = [
            new Annotation({
                size: 40
            }),
            new Annotation({
                size: 30
            }),
            new Annotation({
                size: 20
            })
        ];

        var annotations = new Annotations(models);
        console.log(annotations);
        // _(models).each(function (model) {
        //     $('#app').append(new AnnotationView({model: model}).render().el);
        // });
    }

    clock() {
        $('#app').append(new Clock().render().el);
    }
}

class Clock extends Backbone.View {
    initialize() {
        //console.log("init: clock view");
    }

    tagName() {
        return "div";
    }

    className() {
        return "clock";
    }

    render() {
        this.$el.html(new Date().toString());
        setTimeout(() => this.render(), 1000);

        return this;
    }

}

// class Events extends Backbone.Events {
//
// }

let init = () => {

    var router = new Router();
    Backbone.history.start();

    router.navigate('annotations', {trigger: true});
};

init();