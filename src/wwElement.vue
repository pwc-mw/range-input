<template>
  <!-- <wwElement v-bind="content.stepNumber" :ww-props="{ text: '1' }" /> -->
  <div class="wrapper">
    <!-- <div class="labels">
      <div
        class="labels-item"
        v-for="index in content.maxRange + 1"
        :key="index"
      >
        <wwElement
          v-bind="content.stepNumber"
          class="labels-item-step"
          :ww-props="{ text: `${index - 1}` }"
        />
        <div class="labels-item-step">1</div>
        <div class="labels-item-separator"></div>
      </div>
    </div> -->

    <input
      ref="myrangeinput"
      class="range-input"
      type="range"
      min="0"
      :style="cssVars"
      :max="content.maxRange"
      v-model="intermediateValue"
      :required="content.required"
      id="range-slider-input"
    />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    content: { type: Object, required: true },
    wwFrontState: { type: Object, required: true },
    wwEditorState: { type: Object, required: true },
    wwElementState: { type: Object, required: true },
    uid: { type: String, required: true },
  },
  emits: ["trigger-event"],
  setup(props) {
    const { value: variableValue, setValue } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: "value",
        type: "number",
        defaultValue:
          props.content.value === undefined ? "" : props.content.value,
      });
    // what is formatValue?
    const intermediateValue = ref(null);
    return { variableValue, setValue, intermediateValue };
  },
  computed: {
    gaugeColor() {
      return this.content.gaugeColor;
    },
    thumbColor() {
      return this.content.thumbColor;
    },

    trackColor() {
      return this.content.trackColor;
    },
    sliderHeight() {
      return this.content.sliderHeight;
    },
    thumbWidth() {
      return this.content.thumbWidth;
    },
    thumbHeight() {
      return this.content.thumbHeight;
    },
    thumbBorderRadius() {
      return this.content.thumbBorderRadius;
    },
    rangeInputMargin() {
      return (this.thumbHeight - this.sliderHeight) / 2;
    },
    thumbMarginTop() {
      return ((this.thumbHeight - this.sliderHeight) / 2) * -1;
    },
    cssVars() {
      console.log("borderRadius", this.thumbBorderRadius);
      return {
        "--gauge-color": this.gaugeColor,
        "--track-color": this.trackColor,
        "--thumb-color": this.thumbColor,
        "--slider-height": this.sliderHeight + "px",
        "--thumb-height": this.thumbHeight + "px",
        "--thumb-width": this.thumbWidth + "px",
        "--thumb-border-radius": this.thumbBorderRadius + "px",
        "--range-input-margin": this.rangeInputMargin + "px",
        "--thumb-margin-top": this.thumbMarginTop + "px",
      };
    },
    isEditing() {
      /* wwEditor:start */
      return (
        this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
      );
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    },
    value: {
      get() {
        return this.variableValue;
      },
      set(newValue) {
        this.setValue(newValue);
      },
    },
    maxRange() {
      return this.content.maxRange;
    },
    realRange() {
      return this.content.realRange;
    },
  },

  mounted() {
    // this.updateSliderColor(-1);
    // this.$refs.myrangeinput.addEventListener("input", function () {
    //   let value = ((this.value - this.min) / (this.max - this.min)) * 100;
    //   this.style.background = `linear-gradient(to right, ${this.gaugeColor} 0%, ${this.gaugeColor} ${value}%, ${this.trackColor}  ${value}%, ${this.trackColor} 100%)`;
    // });
  },

  watch: {
    intermediateValue(newValue) {
      this.updateSliderColor(newValue);
      this.setValue(Math.round((newValue / this.maxRange) * this.realRange));
      this.$emit("trigger-event", {
        name: "initValueChange",
        event: { value: newValue },
      });
    },
    "content.value"(newValue) {
      this.intermediateValue = (newValue / this.realRange) * this.maxRange;
      // this.updateSliderColor(newValue);
      // this.setValue(newValue);
      this.$emit("trigger-event", {
        name: "initValueChange",
        event: { value: newValue },
      });
    },
    "content.maxRange"() {
      this.updateSliderColor(-1);
      //it's not very
    },
    "content.gaugeColor"() {
      this.updateSliderColor(-1);
    },
    "content.trackColor"() {
      this.updateSliderColor(-1);
    },
    "content.sliderHeight"() {},
    "content.thumbDimensions"() {},
  },
  methods: {
    updateSliderColor(newValue) {
      console.log("sliderColor fired");
      const inputRef = this.$refs.myrangeinput;
      const min = inputRef.min;
      const max = inputRef.max;
      let value;
      console.log("NewValue: ", typeof newValue);
      if (newValue === -1) {
        value = ((this.value - min) / (max - min)) * 100;
      } else if (newValue === "") {
        value = 50;
      } else {
        value = ((newValue - min) / (max - min)) * 100;
      }
      inputRef.style.background = `linear-gradient(to right, ${this.gaugeColor} 0%, ${this.gaugeColor} ${value}%, ${this.trackColor}  ${value}%, ${this.trackColor} 100%)`;
    },
  },
};
</script>

<!-- -------------------------------------- -->
<!-- -------------------------------------- -->
<!-- -------------------------------------- -->

<style lang="scss" scoped>
$slider-height: 4px;
$thumb-dimensions: 20px; //14px
$label-step-width: 5px;

//----------------------------------------styling
.range-input {
  transition: all 3s ease-in-out;
  padding: 0;
  margin: var(--range-input-margin) 0;

  -webkit-appearance: none;
  appearance: none;
  border-radius: 100px;
  // outline: none;
  // height: $thumb-dimensions;
  width: 100%;
  outline: none;
  height: var(--slider-height);
  background: linear-gradient(
    to right,
    var(--gauge-color) 0%,
    var(--gauge-color) 50%,
    var(--track-color) 50%,
    var(--track-color) 100%
  );

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: var(--thumb-height);
    width: var(--thumb-width);
    border-radius: var(--thumb-border-radius);
    background: var(--thumb-color);
    margin-top: var(--thumb-margin-top);
    box-sizing: content-box;
    cursor: ew-resize;
  }

  &::-webkit-slider-runnable-track {
    // background: rgb(164, 95, 95);
    border-radius: 100px;
    height: var(--slider-height);
  }
}

//DONT FORGET TO MAKE TEXT POSITION ABSOLUTE IN WEWEB!!!!!
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

// .labels {
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
//   // background-color: blue;
//   padding: 0 calc(#{$thumb-dimensions - $label-step-width} / 2);

//   //padding related to the
//   &-item {
//     // background-color: red;
//     display: flex;
//     min-width: $label-step-width;
//     flex-direction: column;
//     align-items: center;
//     position: relative;
//     &-step {
//       left: -10;
//     }
//     &-step {
//       color: transparent;
//       font-size: 14px;
//     }
//     &-separator {
//       width: 2px;
//       height: 10px;
//       margin-top: 8px;
//       margin-bottom: 8px;
//       border-radius: 100px;

//       background-color: #e4e4e4;
//     }
//   }
// }
</style>
