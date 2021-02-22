import {fabric} from 'fabric'

export const Todo = fabric.util.createClass(fabric.Rect, {
    type: "todo",
    initialize(options) {
        options || (options = {});
        this.callSuper('initialize', options);
        //TODO(@pochka15): if options are set then don't override them. Like don't override width if it's already set
        this.set({fill: 'aliceblue', width: 300, height: 300, rx: 10, ry: 10, label: options.label || 'Test label'});
    },
    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },
    _render: function (ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '20px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width / 2, -this.height / 2 + 20);
    }
});

fabric.Todo = Todo;
fabric.Todo.fromObject = function (object, callback) {
    return fabric.Object._fromObject('Todo', object, callback);
}