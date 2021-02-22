import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";


function configuredStompClient(webSocketAddress) {
    return Stomp.over(() => new SockJS(webSocketAddress))
}

const stompClient = {
    props: {
        on: {type: Boolean, default: false}
    },
    render() {
        return this.$scopedSlots.default({
            on: this.currentState
        })
    },
    data() {
        return {
            currentState: this.on,
            stompClient: configuredStompClient('http://tough-canvas-days.herokuapp.com/gs-guide-websocket')
        }
    },
    mounted() {
        this.stompClient.connect({}, () => {
            this.stompClient.subscribe('/topic/add', (message) => {
                this.$emit('received-action', 'add', message.body);
            });
            this.stompClient.subscribe('/topic/remove', (message) => {
                this.$emit('received-action', 'remove', message.body);
            });
        });
    },
    methods: {
        handleCanvasAction(action) {
            const json = JSON.stringify(action.canvasObject);
            console.log("Sending " + action.name);
            this.stompClient.send("/app/" + action.name, {}, json);
        }
    }
}

export {stompClient}

