/**
 * Created by Lennart on 17-11-16.
 */


(function () {
    var Rectangle = Backbone.Model.extend({});
    var RectangleView = Backbone.View.extend({

        tagName:'div',
        className: 'rectangle',

        events: {
            'click': 'move'
        },

        render: function () {
            this.setDemensions();
            this.setPosition();
            this.setColor();
            return this;
        },

        setDemensions: function () {
            this.$el.css({
                width: this.model.get('width') + 'px',
                height: this.model.get('height') + 'px'
                });
        },

        setPosition: function () {
            var position = this.model.get('position');
            this.$el.css({
                left: position.x,
                top: position.y
            })
        },
        
        setColor: function () {
            this.$el.css('background-color', this.model.get('color'));
        },

        move: function () {
            this.$el.css('left', this.$el.position().left + 10);
        }
    });

    var models = [
        new Rectangle({
            width: 100,
            height: 60,
            position: {x: 500, y: 100},
            color: 'red'
        }),
        new Rectangle({
            width: 90,
            height: 300,
            position: {x: 50, y: 250},
            color: 'blue'
        }),
        new Rectangle({
            width: 400,
            height: 300,
            position: {x: 800, y: 300},
            color: 'green'
        })
    ];
    
    _(models).each(function (model) {
        $('#canvas').append(new RectangleView({model: model}).render().el);
    });

})();