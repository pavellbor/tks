{
  const constructor = (search) => {
    const showPopup = () => {
      if (!popup.classList.contains(POPUP_SWITCHABLE_CLASS)) {
        popup.classList.add(POPUP_SWITCHABLE_CLASS);
      }
    };

    const hidePopup = () => {
      if (popup.classList.contains(POPUP_SWITCHABLE_CLASS)) {
        popup.classList.remove(POPUP_SWITCHABLE_CLASS);
      }
    };

    const clearInput = () => {
      input.value = "";
    };

    const onHide = () => {
      hidePopup();
      clearInput();
    };

    const onShowClick = () => {
      showPopup();
    };

    const onHideClick = () => {
      onHide();
    };

    const onClearClick = () => {
      clearInput();
    };

    const onOverlayClick = (event) => {
      const isOverlayEvent = event.target === popup;
      if (isOverlayEvent) {
        onHide();
      }
    };

    const openBtn = search.querySelector("[data-search-open]");
    const closeBtn = search.querySelector("[data-search-close]");
    const clearBtn = search.querySelector("[data-search-clear]");
    const popup = search.querySelector("[data-search-popup]");
    const input = search.querySelector("[data-search-input]");

    const POPUP_SWITCHABLE_CLASS = "search__popup--visible";

    openBtn.addEventListener("click", onShowClick);
    closeBtn.addEventListener("click", onHideClick);
    clearBtn.addEventListener("click", onClearClick);
    popup.addEventListener("click", onOverlayClick);
  };

  const search = document.querySelector("[data-search]");
  constructor(search);
}
