{
    const navTabs = document.querySelectorAll('[data-nav-number]')
    const tabPanels = document.querySelectorAll('[data-tab-number]')

    const setActiveStateControl = (navTabs, tabPanels) => {

        navTabs.forEach((navTab) => {
            navTab.addEventListener('click', () => {

                navTabs.forEach((tab) => {
                    tab.classList.remove('nav-tabs__item--active')
                })

                navTab.classList.add('nav-tabs__item--active')
                const tabNumber = navTab.getAttribute('data-nav-number')

                tabPanels.forEach((panel) => {
                    panel.classList.add('tab-panel--hidden')
                })

                const activePanel = document.querySelector(`[data-tab-number="${tabNumber}"]`)
                activePanel.classList.remove('tab-panel--hidden')

            })
        })
    }

    setActiveStateControl(navTabs, tabPanels)
}
