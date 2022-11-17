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
    maxRange: {
      label: { en: "Max range" },
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
