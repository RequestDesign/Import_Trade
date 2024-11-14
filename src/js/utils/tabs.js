import { setHash, getHash } from './utils';

// --------------------------------------------------------------------------

class Tabs {
  constructor() {
    this.attrs = {
      TABS: 'data-tabs',
      INDEX: 'data-tabs-index',
      TITLES: 'data-tabs-titles',
      TITLE: 'data-tabs-title',
      TAB_ITEM: 'data-tabs-item',
      BODY: 'data-tabs-body',
      HASH: 'data-tabs-hash',
    };
    this.classes = {
      INIT: '_tabs-init',
      ACTIVE: '_is-active',
      MODAL: 'modal',
    };
    this.tabs = document.querySelectorAll(`[data-tabs]`);
    this.activeHash = [];

    if (this.tabs.length) {
      const hash = getHash();

      if (hash && hash.startsWith('tab-')) {
        activeHash = hash.replace('tab-', '').split('-');
      }

      this.tabs.forEach((tabsBlock, index) => {
        tabsBlock.classList.add(this.classes.INIT);
        tabsBlock.setAttribute(this.attrs.INDEX, index);
        tabsBlock.addEventListener('click', this.setActions.bind(this));
        this.init(tabsBlock);
      });
    }
  }

  setStatus(tabsBlock) {
    let titles = tabsBlock.querySelectorAll(`[${this.attrs.TITLE}]`);
    let content = tabsBlock.querySelectorAll(`[${this.attrs.TAB_ITEM}]`);
    const index = tabsBlock.dataset.tabsIndex;

    if (content.length) {
      const hasHash = tabsBlock.hasAttribute(this.attrs.HASH);

      content = Array.from(content).filter(
        item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock
      );

      titles = Array.from(titles).filter(
        item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock
      );

      content.forEach((item, indx) => {
        if (titles[indx].classList.contains(this.classes.ACTIVE)) {
          item.hidden = false;

          if (hasHash && !item.closest(`.${this.classes.MODAL}`)) {
            setHash(`tab-${index}-${indx}`);
          }
        } else {
          item.hidden = true;
        }
      });
    }
  }

  setActions(e) {
    const target = e.target;

    if (target.closest(`[${this.attrs.TITLE}]`)) {
      const title = target.closest(`[${this.attrs.TITLE}]`);
      const tabsBlock = title.closest(`[${this.attrs.TABS}]`);

      if (!title.classList.contains(this.classes.ACTIVE)) {
        let activeTitle = tabsBlock.querySelectorAll(
          `[${this.attrs.TITLE}].${this.classes.ACTIVE}`
        );

        activeTitle.length
          ? (activeTitle = Array.from(activeTitle).filter(
              item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock
            ))
          : null;
        activeTitle.length
          ? activeTitle[0].classList.remove(this.classes.ACTIVE)
          : null;
        title.classList.add(this.classes.ACTIVE);
        this.setStatus(tabsBlock);
      }

      e.preventDefault();
    }
  }

  init(tabsBlock) {
    let titles = tabsBlock.querySelectorAll(`[${this.attrs.TITLES}]>*`);
    let content = tabsBlock.querySelectorAll(`[${this.attrs.BODY}]>*`);
    const index = tabsBlock.dataset.tabsIndex;
    const activeHashBlock = this.activeHash[0] == index;

    if (activeHashBlock) {
      const activeTitle = tabsBlock.querySelector(
        `[${this.attrs.TITLES}]>.${this.classes.ACTIVE}`
      );
      activeTitle ? activeTitle.classList.remove(this.classes.ACTIVE) : null;
    }

    if (content.length) {
      content = Array.from(content).filter(
        item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock
      );
      titles = Array.from(titles).filter(
        item => item.closest(`[${this.attrs.TABS}]`) === tabsBlock
      );

      content.forEach((item, index) => {
        titles[index].setAttribute(this.attrs.TITLE, '');
        item.setAttribute(this.attrs.TAB_ITEM, '');

        if (activeHashBlock && index == this.activeHash[1]) {
          titles[index].classList.add(this.classes.ACTIVE);
        }
        item.hidden = !titles[index].classList.contains(this.classes.ACTIVE);
      });
    }
  }
}

// --------------------------------------------------------------------------

new Tabs();
