function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}


// taken from web
export function addGeneratedId(canvasObject) {
    canvasObject._id = s4() + s4() + s4() + s4() + s4() + s4();
    return canvasObject;
}