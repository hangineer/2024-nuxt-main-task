import Collapse from "bootstrap/js/dist/collapse";
import Dropdown from "bootstrap/js/dist/dropdown";
import Modal from "bootstrap/js/dist/modal";
import Tooltip from "bootstrap/js/dist/tooltip";
import Popover from "bootstrap/js/dist/popover";

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      bootstrap: {
        modal: (element) => new Modal(element),
        collapse: (element) => new Collapse(element),
        dropdown: (element) => new Dropdown(element),
      },
    },
  };
});

/**
 * 使用方式
 * const { $bootstrap } = useNuxtApp();
 * let modal = $bootstrap.modal(modalRef.value);
 */
