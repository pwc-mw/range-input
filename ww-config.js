export default {
  editor: {
    label: {
      en: "Custom range input",
    },
  },
  properties: {
    value: {
      label: {
        en: "Initial value",
      },
      type: "Text",
      bindable: true,
      defaultValue: 0,
      section: "settings",
      bindingValidation: {
        validations: [{ type: "string" }, { type: "number" }],
        tooltip: "a string that defines the initial value",
      },
    },
    sliderHeight: {
      label: { en: "slider Height" },
      type: "Number",
      section: "settings",
      defaultValue: 4,
    },
    thumbWidth: {
      label: { en: "thumb Width" },
      type: "Number",
      section: "settings",
      defaultValue: 14,
    },
    thumbHeight: {
      label: { en: "thumb Height" },
      type: "Number",
      section: "settings",
      defaultValue: 14,
    },
    thumbBorderRadius: {
      label: { en: "thumb border Radius" },
      type: "Number",
      section: "settings",

      defaultValue: 100,
    },
    gaugeColor: {
      label: { en: "gauge color" },
      type: "Color",
      defaultValue: "#000",
      bindingValidation: {
        validations: [{ type: "string" }, { type: "number" }],
        tooltip: "a string that defines the initial value",
      },
      bindable: true,
      bindingValidation: {
        validations: [{ type: "string" }, { type: "number" }],
        tooltip: "a string that defines the initial value",
      },
    },
    thumbColor: {
      label: { en: "thumb color" },
      type: "Color",
      defaultValue: "#000",
      bindingValidation: {
        validations: [{ type: "string" }, { type: "number" }],
        tooltip: "a string that defines the initial value",
      },
      bindable: true,
      bindingValidation: {
        validations: [{ type: "string" }, { type: "number" }],
        tooltip: "a string that defines the initial value",
      },
    },
    trackColor: {
      label: { en: "track color" },
      type: "Color",
      defaultValue: "grey",
      bindingValidation: {
        validations: [{ type: "string" }, { type: "number" }],
        tooltip: "a string that defines the initial value",
      },
      bindable: true,
      bindingValidation: {
        validations: [{ type: "string" }, { type: "number" }],
        tooltip: "a string that defines the initial value",
      },
    },
    maxRange: {
      label: { en: "smoothness" },
      type: "Number",
      defaultValue: 100,
      bindable: true,
      section: "settings",
    },
    realRange: {
      label: { en: "real Range" },
      type: "Number",
      defaultValue: 10,
      bindable: true,
      section: "settings",
    },
    required: {
      label: {
        en: "Required",
      },
      section: "settings",
      type: "OnOff",
      bindable: true,
      defaultValue: true,
      bindingValidation: {
        type: "boolean",
        tooltip: "A boolean that defines if the input is required",
      },
    },
    stepNumber: {
      hidden: true,
      defaultValue: { isWwObject: true, type: "ww-text" },
    },
  },
};
