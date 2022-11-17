<template>
  <!-- <wwElement v-bind="content.stepNumber" :ww-props="{ text: '1' }" /> -->
  <div class="wrapper">
    <div class="labels">
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
    </div>
    <input
      ref="myrangeinput"
      class="range-input"
      type="range"
      min="0"
      :max="content.maxRange"
      v-model="value"
      :required="content.required"
      id="range-slider-input"
    />
  </div>
</template>

<script>
const sliderCol1 = "#444444";
const sliderCol2 = "#F2F2F2";
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
    return { variableValue, setValue };
  },
  computed: {
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
  },
  mounted() {
    this.updateSliderColor(-1);
    this.$refs.myrangeinput.addEventListener("input", function () {
      let value = ((this.value - this.min) / (this.max - this.min)) * 100;

      this.style.background = `linear-gradient(to right, ${sliderCol1} 0%, ${sliderCol1} ${value}%, ${sliderCol2}  ${value}%, ${sliderCol2} 100%)`;
    });
  },
  watch: {
    "content.value"(newValue) {
      this.updateSliderColor(newValue);
      this.setValue(newValue);
      this.$emit("trigger-event", {
        name: "initValueChange",
        event: { value: newValue },
      });
    },
    "content.maxRange"() {
      this.updateSliderColor(-1);
      //it's not very
    },
  },
  methods: {
    updateSliderColor(newValue) {
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
      inputRef.style.background = `linear-gradient(to right, ${sliderCol1} 0%, ${sliderCol1} ${value}%, ${sliderCol2}  ${value}%, ${sliderCol2} 100%)`;
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
$col1: #444444;
$col2: #f2f2f2; //f2f2f2
$label-step-width: 5px;

//styling
.range-input {
  padding: 0;
  margin: calc(#{$thumb-dimensions - $slider-height}/ 2) 0;

  -webkit-appearance: none;
  appearance: none;
  border-radius: 100px;
  // outline: none;
  // height: $thumb-dimensions;
  width: 100%;
  outline: none;
  height: $slider-height;
  background: linear-gradient(
    to right,
    $col1 0%,
    $col1 50%,
    $col2 50%,
    $col2 100%
  );
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: $thumb-dimensions;
    width: $thumb-dimensions;
    border-radius: 50%;
    background: #434343;
    margin-top: calc((((#{$thumb-dimensions - $slider-height}) / 2) * -1));
    box-sizing: content-box;
    cursor: ew-resize;
  }

  &::-webkit-slider-runnable-track {
    // background: rgb(164, 95, 95);
    border-radius: 100px;
    height: $slider-height;
  }
}

//DONT FORGET TO MAKE TEXT POSITION ABSOLUTE IN WEWEB!!!!!
.wrapper {
  // background-color: black;
  display: flex;
  flex-direction: column;
}
.labels {
  display: flex;
  width: 100%;
  justify-content: space-between;
  // background-color: blue;
  padding: 0 calc(#{$thumb-dimensions - $label-step-width} / 2);

  //padding related to the
  &-item {
    // background-color: red;
    display: flex;
    min-width: $label-step-width;
    flex-direction: column;
    align-items: center;
    position: relative;
    &-step {
      left: -10;
    }
    &-step {
      color: transparent;
      font-size: 14px;
    }
    &-separator {
      width: 2px;
      height: 10px;
      margin-top: 8px;
      margin-bottom: 8px;
      border-radius: 100px;

      background-color: #e4e4e4;
    }
  }
}
</style>
