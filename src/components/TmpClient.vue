<template>
  <v-container fluid>
    <div class="d-flex flex-column mb-6">
      <span>Status: {{ isConnected }}</span>
      <span>Greeting: {{ greeting }}</span>
      <label>
        Name
        <input v-model="name" placeholder="edit me">
      </label>
      <a @click="sendName"> Send name </a>
      <a @click="connect"> Connect </a>
      <a @click="disconnect"> Disconnect </a>
    </div>
  </v-container>
</template>

<script>
import {Stomp} from '@stomp/stompjs'
import SockJS from 'sockjs-client'


export default {
  name: "TestServer",

  data() {
    return {
      stompClient: null,
      isConnected: false,
      greeting: "",
      name: "Artsiom"
    }
  },

  methods: {
    connect() {
      this.stompClient = Stomp.over(() => new SockJS('http://tough-canvas-days.herokuapp.com/gs-guide-websocket'));
      this.stompClient.connect({}, (frame) => {
        this.isConnected = true;
        console.log('Connected: ' + frame);
        this.stompClient.subscribe('/topic/greetings', (greeting) => {
          this.updateGreeting(JSON.parse(greeting.body).content);
        });
      });
    },
    updateGreeting(message) {
      this.greeting = message
      console.log("Greeting is updated: " + this.greeting)
    },
    disconnect() {
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
      this.isConnected = false;
      console.log("Disconnected");
    },
    sendName() {
      this.stompClient.send("/app/hello", {}, JSON.stringify(this.name));
    }


  }
}
</script>

<style scoped>

</style>