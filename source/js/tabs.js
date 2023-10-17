{
  const TABS_CONTAINER_ATTRIBUTE = 'data-tabs'
  
  const NAV_TAB_ATTRIBUTE = 'data-tabs-nav'
  const NAV_TAB_ACTIVE_CLASS = 'nav-tabs__item--active'

  const PANEL_TAB_ATTRIBUTE = 'data-tabs-panel'
  const PANEL_TAB_HIDDEN_CLASS = 'tab-panel--hidden'

  const constructor = (container) => {
    const hideAllPanelTabs = (panelTabs) => {
      panelTabs.forEach((panel) => {
        panel.classList.add(PANEL_TAB_HIDDEN_CLASS)
      })
    }

    const getPanelTabByNavTab = (navTab) => {
      const tabNumber = navTab.getAttribute(NAV_TAB_ATTRIBUTE)
      return container.querySelector(`[${PANEL_TAB_ATTRIBUTE}="${tabNumber}"]`)
    }
    
    const showPanelTab = (panelTab) => {
      panelTab.classList.remove(PANEL_TAB_HIDDEN_CLASS)
    }

    const resetAllNavTabs = (navTabs) => {
      navTabs.forEach((navTab) => {
        navTab.classList.remove(NAV_TAB_ACTIVE_CLASS)
      })
    }

    const setActiveNavTab = (navTab) => {
      navTab.classList.add(NAV_TAB_ACTIVE_CLASS)
    }

    const updateActiveNavTab = (navTabs, navTab) => {
      resetAllNavTabs(navTabs)
      setActiveNavTab(navTab)
    }

    const updateActivePanelTab = (panelTabs, panelTab) => {
      hideAllPanelTabs(panelTabs)
      showPanelTab(panelTab)
    }

    const initEvents = (navTab) => {
      navTab.addEventListener('click', () => {
        updateActiveNavTab(navTabs, navTab)

        const panelTab = getPanelTabByNavTab(navTab)
        updateActivePanelTab(panelTabs, panelTab)
      })
    }

    const navTabs = container.querySelectorAll(`[${NAV_TAB_ATTRIBUTE}]`)
    const panelTabs = container.querySelectorAll(`[${PANEL_TAB_ATTRIBUTE}]`)
    navTabs.forEach(initEvents)
  }

  const containers = document.querySelectorAll(`[${TABS_CONTAINER_ATTRIBUTE}]`)
  containers.forEach(constructor)
}
