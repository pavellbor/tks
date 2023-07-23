{
  const TREE_SELECTOR = '.tree-list'
  const TREE_ITEM_SELECTOR = '.tree-list__item'
  const TREE_ITEM_ACTIVE_CLASS = 'tree-list__item--expanded'
  const TREE_SECTION_SELECTOR = '.tree-list__section'
  const PRODUCT_ITEM_SELECTOR = '.product-list__item'
  const PRODUCT_ITEM_ACTIVE_CLASS = 'product-list__item--expanded'
  const OFFSET_X_IN_PX = 15
  const DESKTOP_WIDTH_IN_PX = 1010

  const getOffsetLeft = (el) => {
    return el?.getBoundingClientRect()?.left || 0
  }

  const setInnerListLeftPadding = (el) => {
    const innerList = el.querySelector(TREE_SELECTOR)
    if (!innerList) {
      return
    }

    const innerListOffset = getOffsetLeft(innerList)

    const section = el.querySelector(TREE_SECTION_SELECTOR)
    const sectionOffsetLeft = getOffsetLeft(section)

    const innerListOffsetLeft =
      sectionOffsetLeft - innerListOffset - OFFSET_X_IN_PX
    innerList.style.paddingLeft = `${innerListOffsetLeft}px`
  }

  const toggleTreeItem = (el) => {
    if (isFinitItem(el)) {
      currentItem?.classList?.remove(TREE_ITEM_ACTIVE_CLASS)
      currentItem = el
    }

    el.classList.toggle(TREE_ITEM_ACTIVE_CLASS)

    if (isDesktop) {
      setInnerListLeftPadding(el)
    }
  }

  const toggleProductItem = (el) => {
    el.classList.toggle(PRODUCT_ITEM_ACTIVE_CLASS)
  }

  const initEvents = (root) => {
    root.addEventListener('click', (e) => {
      e.preventDefault()

      const treeItem = e.target.closest(TREE_ITEM_SELECTOR)
      if (treeItem) {
        toggleTreeItem(treeItem)
        return
      }

      const productItem = e.target.closest(PRODUCT_ITEM_SELECTOR)
      if (productItem) {
        toggleProductItem(productItem)
      }
    })
  }

  const setAllExpandedListLeftPadding = (root) => {
    const allExpandedList = root.querySelectorAll(`.${TREE_ITEM_ACTIVE_CLASS}`)
    allExpandedList.forEach(setInnerListLeftPadding)
  }

  const isFinitItem = (el) => {
    return !el.querySelector(TREE_SELECTOR)
  }

  const initCurrentItem = (root) => {
    const items = root.querySelectorAll(`.${TREE_ITEM_ACTIVE_CLASS}`)
    currentItem = Array.from(items).find(isFinitItem)
  }

  const constructor = (root) => {
    initEvents(root)
    initCurrentItem(root)

    if (isDesktop) {
      setAllExpandedListLeftPadding(root)
    }
  }

  const isDesktop = window.matchMedia(
    `(min-width: ${DESKTOP_WIDTH_IN_PX}px)`
  ).matches
  const root = document.querySelector('[data-tree-list]')
  let currentItem = null

  constructor(root)
}
