{
  const root = document.querySelector('[data-tree-list]')
  const TREE_SELECTOR = '.tree-list'
  const TREE_ITEM_SELECTOR = '.tree-list__item'
  const TREE_ITEM_ACTIVE_CLASS = 'tree-list__item--expanded'
  const TREE_SECTION_SELECTOR = '.tree-list__section'
  const PRODUCT_ITEM_SELECTOR = '.product-list__item'
  const PRODUCT_ITEM_ACTIVE_CLASS = 'product-list__item--expanded'
  const OFFSET_X_IN_PX = 15
  const DESKTOP_WIDTH_IN_PX = 1010

  const isDesktop = window.matchMedia(`(min-width: ${DESKTOP_WIDTH_IN_PX}px)`).matches
  
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

    const innerListOffsetLeft = sectionOffsetLeft - innerListOffset - OFFSET_X_IN_PX
    innerList.style.paddingLeft = `${innerListOffsetLeft}px`
  }

  const toggleTreeItem = (el) => {
    el.classList.toggle(TREE_ITEM_ACTIVE_CLASS)
    
    if (isDesktop) {
      setInnerListLeftPadding(el)
    }
  }

  const toggleProductItem = (el) => {
    el.classList.toggle(PRODUCT_ITEM_ACTIVE_CLASS)
  }

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
