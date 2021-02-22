import {fabric} from 'fabric'

export const CustomText = fabric.util.createClass(fabric.IText, {
    type: "customText",
    initialize(options) {
        options || (options = { });
        this.callSuper('initialize', "Empty", options);
        this.set('fontFamily', 'Helvetica')
    },
});

fabric.CustomText = CustomText;
fabric.CustomText.fromObject = function (object, callback) {
    return fabric.Object._fromObject('CustomText', object, callback);
}