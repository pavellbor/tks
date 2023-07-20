{
  const DESKTOP_WIDTH = '1010px'
  
  const createObserver = ({ stickyHeader, className }) => {
    const isDesktop = window.matchMedia(`(min-width: ${DESKTOP_WIDTH})`).matches
    const intersectionRatio = isDesktop ? 0.65 : 1

    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stickyHeader.classList.toggle(
            className,
            entry.intersectionRatio < intersectionRatio
          )
        })
      },
      { threshold: [intersectionRatio] }
    )
  }

  const observe = ({ stickyHeader, className }) => {
    const observer = createObserver({ stickyHeader, className })
    observer.observe(stickyHeader)
  }

  const constructor = (stickyHeader) => {
    const instance = {
      stickyHeader,
      className: stickyHeader.dataset.stickyHeaderClass,
    }

    const init = (instance) => {
      observe(instance)
    }

    init(instance)
  }

  const stickyHeader = document.querySelector('[data-sticky-header-class]')
  constructor(stickyHeader)
}
