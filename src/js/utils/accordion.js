import {
  dataMediaQueries,
  _slideToggle,
  _slideUp,
  _slideDown,
} from './utils.js';

// --------------------------------------------------------------------------

class Accordion {
  constructor() {
    this.accordionItems = document.querySelectorAll('[data-accordion]');
    this.mdQueriesArray = dataMediaQueries(this.accordionItems, 'accordion');
    this.regItems = Array.from(this.accordionItems).filter(function (
      item,
      index,
      self
    ) {
      return !item.dataset.accordion.split(',')[0];
    });
    this.attrs = {
      ACCORDION: 'data-accordion',
      ITEM: 'data-accordion-item',
      SINGLE: 'data-accordion-single',
    };
    this.classes = {
      INIT: '_accordion-init',
      ACTIVE: '_is-active',
    };

    // init regular accordion items
    if (this.regItems.length) {
      this.init(this.regItems);
    }
    // init accordion items with media queries
    if (this.mdQueriesArray && this.mdQueriesArray.length) {
      const _this = this;

      this.mdQueriesArray.forEach(mdQueriesItem => {
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          _this.init(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        this.init(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  hideBody(accordionGroup) {
    const activeTitle = accordionGroup.querySelector(
      `[${this.attrs.ITEM}].${this.classes.ACTIVE}`
    );
    const speed = accordionGroup.dataset.accordionSpeed
      ? parseInt(accordionGroup.dataset.accordionSpeed)
      : 500;

    if (activeTitle && !accordionGroup.querySelectorAll('._slide').length) {
      activeTitle.classList.remove(this.classes.ACTIVE);
      _slideUp(activeTitle.nextElementSibling, speed);
    }
  }

  setActions(e) {
    const target = e.target;

    if (target.closest(`[${this.attrs.ITEM}]`)) {
      const title = target.closest(`[${this.attrs.ITEM}]`);
      const group = title.closest(`[${this.attrs.ACCORDION}]`);
      const isSingle = group.hasAttribute(this.attrs.SINGLE);
      const speed = group.dataset.accordionSpeed
        ? parseInt(group.dataset.accordionSpeed)
        : 500;

      if (!group.querySelectorAll('._slide').length) {
        if (isSingle && !title.classList.contains(this.classes.ACTIVE)) {
          this.hideBody(group);
        }
        title.classList.toggle(this.classes.ACTIVE);
        _slideToggle(title.nextElementSibling, speed);
      }
      e.preventDefault();
    }
  }

  initBody(accordionGroup, hideBody = true) {
    let titles = accordionGroup.querySelectorAll(`[${this.attrs.ITEM}]`);

    if (titles.length) {
      titles = Array.from(titles).filter(
        item => item.closest(`[${this.attrs.ACCORDION}]`) === accordionGroup
      );
      titles.forEach(title => {
        if (hideBody) {
          title.removeAttribute('tabindex');
          if (!title.classList.contains(this.classes.ACTIVE)) {
            title.nextElementSibling.hidden = true;
          }
        } else {
          title.setAttribute('tabindex', '-1');
          title.nextElementSibling.hidden = false;
        }
      });
    }
  }

  init(accordionItems, matchMedia = false) {
    accordionItems.forEach(accordionGroup => {
      accordionGroup = matchMedia ? accordionGroup.item : accordionGroup;
      if (matchMedia.matches || !matchMedia) {
        accordionGroup.classList.add(this.classes.INIT);
        this.initBody(accordionGroup);
        accordionGroup.addEventListener('click', this.setActions.bind(this));
      } else {
        accordionGroup.classList.remove(this.classes.INIT);
        this.initBody(accordionGroup, false);
        accordionGroup.removeEventListener('click', this.setActions.bind(this));
      }
    });
  }
}

// --------------------------------------------------------------------------

new Accordion();
