<template>
  <v-app id="inspire">
    <v-navigation-drawer
        permanent
        mini-variant
        app
        class="pt-4"
        color="grey lighten-3"
    >
      <v-list>
        <v-list-item-group
            v-model="selectedItemIndex"
            color="primary">
          <!--          <draggable v-model="items" @start="onDragStarted" @end="onDragEnd">-->
          <!--          </draggable>-->
          <v-list-item
              v-for="(item, i) in items"
              :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <!--              <v-list-item-title v-text="item.text"></v-list-item-title>-->
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>
    <v-main>
      <Canvas @canvas-action-made="passActionToClient"
              ref="canvas" :dragged-item="selectedItem"
              style="width: 100%; height: 100%"/>
      <stompClient ref="stompClient" @received-action="passActionToCanvas">
        <div class="container" slot-scope="{  }"/>
      </stompClient>
    </v-main>
  </v-app>
</template>

<script>
import Canvas from "@/components/Canvas";
import {stompClient} from "@/js/StompClient";
// import draggable from 'vuedraggable'

export default {
  name: 'App',

  // components: {Canvas, draggable},
  components: {Canvas, stompClient},

  methods: {
    passActionToCanvas(actionName, canvasObjectAsString) {
      this.$refs.canvas.updateCanvas(actionName, canvasObjectAsString)
    },
    passActionToClient(action) {
      this.$refs.stompClient.handleCanvasAction(action);
    }
  },
  data: () => ({
    selectedItemIndex: 0,
    items: [
      {text: 'Text', icon: 'mdi-text'},
      {text: 'Todo', icon: 'mdi-check'},
      {text: 'Draw', icon: 'mdi-draw'},
      {text: 'Erase', icon: 'mdi-eraser'},
    ],
  }),
  computed: {
    selectedItem() {
      return this.selectedItemIndex !== undefined ? this.items[this.selectedItemIndex].text : undefined;
    }
  }
};
</script>
