<template>
  <canvas ref="myCanvas" v-resize="onResize"></canvas>
</template>

<script>
import {fabric} from 'fabric'
import {CustomText} from "@/js/fabric/CustomText";
import {Todo} from "@/js/fabric/Todo";
import {addGeneratedId} from "@/js/fabric/utils";
import {CanvasAction} from "@/js/fabric/CanvasAction";

// eslint-disable-next-line no-unused-vars
function addObjectToCanvas(canvas, json) {
  fabric.util.enlivenObjects([json], objects => {
    const origRenderOnAddRemove = canvas.renderOnAddRemove;
    canvas.renderOnAddRemove = false;

    objects.forEach(o => canvas.add(o));

    canvas.renderOnAddRemove = origRenderOnAddRemove;
    canvas.renderAll();
  });
}

export default {
  name: "Canvas",

  data() {
    return {
      canvas: undefined,
      isEraseMode: false,
      nameToItemClass: new Map([['Text', CustomText], ['Todo', Todo]]),
    }
  },

  props: {
    draggedItem: String,
  },

  watch: {
    draggedItem: function (newVal) {
      this.canvas.isDrawingMode = newVal === "Draw";
      this.isEraseMode = newVal === "Erase";
    }
  },

  methods: {
    onResize() {
      this.$refs.myCanvas.width = this.$refs.myCanvas.parentElement.clientWidth;
      this.$refs.myCanvas.height = this.$refs.myCanvas.parentElement.clientHeight;
    },
    updateCanvas(actionName, canvasObjectAsString) {
      const json = JSON.parse(canvasObjectAsString);
      const existsWithSameId = this.canvas.getObjects().find(obj => obj._id === json._id);
      if (actionName === 'add' && !existsWithSameId) {
        console.log("Doesn't exist")
        addObjectToCanvas(this.canvas, json);
      } else if (actionName === 'remove' && existsWithSameId) {
        this.canvas.remove(existsWithSameId);
      }
    },
  },
  mounted() {
    this.canvas = new fabric.Canvas(this.$refs.myCanvas)
        .on('mouse:down', ev => {
          const foundItemClass = this.nameToItemClass.get(this.draggedItem);
          if (foundItemClass) {
            const canvasObj = new foundItemClass({left: ev.pointer.x, top: ev.pointer.y});
            if (!canvasObj._id) addGeneratedId(canvasObj);
            this.canvas.add(canvasObj);
            this.$emit('canvas-action-made', new CanvasAction('add', canvasObj))
          } else if (this.isEraseMode && ev.target) {
            this.canvas.remove(ev.target);
            this.$emit('canvas-action-made', new CanvasAction('remove', ev.target));
          }
        }).on('object:added', ev => {
          console.log(ev.target)
          if (this.canvas.isDrawingMode && ev.target && ev.target.type === 'path') {
            this.$emit('canvas-action-made', new CanvasAction('add',
                ev.target._id ? ev.target : addGeneratedId(ev.target)));
          }
        });
  }
}
</script>

<style scoped>

</style>