{
  const constructor = (trigger) => {
    const lockBody = () => {
      document.body.style.overflowY = 'hidden'
    }

    const unlockBody = () => {
      document.body.removeAttribute('style')
    }

    const onShow = () => {
      lockBody()
      showModal()
      initModalEvents()
    }
    
    const showModal = () => {
      if (!modal.classList.contains(MODAL_SWITCHABLE_CLASS)) {
        modal.classList.add(MODAL_SWITCHABLE_CLASS)
      }
    }

    const initModalEvents = () => {
      closeBtn.addEventListener('click', onCloseClick)
      modal.addEventListener('click', onOverlayClick)
      window.addEventListener('keydown', onEscKeyDown)
    }

    const onCloseClick = () => {
      onHide()
    }

    const onHide = () => {
      unlockBody()
      hideModal()
      removeModalEvents()
    }

    const hideModal = () => {
      if (modal.classList.contains(MODAL_SWITCHABLE_CLASS)) {
        modal.classList.remove(MODAL_SWITCHABLE_CLASS)
      }
    }

    const onOverlayClick = (event) => {
      const isOverlayEvent = event.target === modal
      if (isOverlayEvent) {
        onHide()
      }
    }

    const onEscKeyDown = (event) => {
      if (event.key === 'Escape') {
        onHide()
      }
    }

    const onTriggerClick = () => {
      onShow()
    }

    const removeModalEvents = () => {
      closeBtn.removeEventListener('click', onCloseClick)
      modal.removeEventListener('click', onOverlayClick)
      window.removeEventListener('keydown', onEscKeyDown)
    }

    const modalId = trigger.dataset.modalTrigger
    const modal = document.querySelector(`[data-modal="${modalId}"]`)
    const closeBtn = modal.querySelector('[data-modal-close]')
    const MODAL_SWITCHABLE_CLASS = 'modal--visible'

    trigger.addEventListener('click', onTriggerClick)
    if (modal.classList.contains(MODAL_SWITCHABLE_CLASS)) {
      onShow()
    }
  }

  const triggers = document.querySelectorAll('[data-modal-trigger]')
  triggers.forEach(constructor)
}
