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
        setTimeout( () => this.render(), 1000);

        return this;
    }

}

let init = () => {

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


    $('#app').append(new CanvasView({model: new Canvas()}).render().el);

    $('#app').append(new Clock().render().el);


    $('#app').append(new ButtonView().render().el);

    _(models).each(function (model) {
        $('#canvas').append(new AnnotationView({model: model}).render().el);
    });

};

init();