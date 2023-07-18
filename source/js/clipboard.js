{
  const TOOLTIP_TEMPLATE = `<div class="tooltip">
  <div class="tooltip__triangle"></div>
  <div class="tooltip__body">Cкопировано!<br> Код готов к вставке</div>
  </div>
  `;
  const TOOLTIP_REMOVE_TIMEOUT = 2000;

  let lastTooltip = null;
  let lastTimer = null;

  const createTooltip = () => {
    const div = document.createElement("div");
    div.innerHTML = TOOLTIP_TEMPLATE;
    return div.firstElementChild;
  };

  const hideLastTooltipIfExist = () => {
    if (lastTooltip) {
      lastTooltip.remove();
      lastTooltip = null;
    }

    if (lastTimer) {
      clearTimeout(lastTimer);
      lastTimer = null;
    }
  };

  const showTooltip = (parent) => {
    hideLastTooltipIfExist();

    const tooltip = createTooltip();
    lastTooltip = tooltip;

    parent.append(tooltip);

    lastTimer = setTimeout(() => {
      tooltip.remove();
    }, TOOLTIP_REMOVE_TIMEOUT);
  };

  const constructor = (copiedElement) => {
    copiedElement.addEventListener("click", () => {
      const copiedText = copiedElement.textContent;

      navigator.clipboard
        .writeText(copiedText)
        .then(() => {
          showTooltip(copiedElement);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  const copiedElements = document.querySelectorAll("[data-clipboard]");
  copiedElements.forEach(constructor);
}
