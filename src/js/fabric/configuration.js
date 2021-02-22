import {fabric} from "fabric";

export default function () {
    fabric.Object.prototype.toObject = (toObject => function (properties) {
        return fabric.util.object.extend(toObject.call(this, properties), {
            _id: this._id || null,
            remote: this.remote || false
        });
    })(fabric.Object.prototype.toObject);
}