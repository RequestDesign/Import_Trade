import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import { _slideUp, _slideDown, _slideToggle } from './utils.js';

// --------------------------------------------------------------------------

export class Select {
  // setup ------------------------------------------------------------------

  constructor() {
    this._this = this;

    // custom select classes
    this.classes = {
      // html build classes
      SELECT: 'select',
      BODY: 'select__body',
      LABEL: 'select__label',
      TITLE: 'select__title',
      VALUE: 'select__value',
      CONTENT: 'select__content',
      OPTIONS: 'select__options',
      OPTION: 'select__option',
      SCROLL: 'select__scroll',
      GROUP: 'select__group',
      INPUT: 'select__input',
      ASSET: 'select__asset',
      TXT: 'select__text',

      // state classes
      IS_ACTIVE: '_is-active',
      IS_FOCUSED: '_is-focused',
      IS_OPENED: '_is-opened',
      IS_FILLED: '_is-filled',
      IS_SELECTED: '_is-selected',
      IS_DISABLED: '_is-disabled',

      // additional classes
      HAS_LIST: '_has-list',
      HAS_ERROR: '_has-error',
      HAS_MULTIPLE: '_has-multiple',
      HAS_CHECKBOX: '_has-checkbox',
      HAS_LABEL: '_has-label',
    };

    // all select items
    const selectList = document.querySelectorAll('select');
    if (selectList.length) {
      this.init(selectList);
    }
  }

  // select initialization & build ------------------------------------------

  // initialization
  init(selectList) {
    // init
    selectList.forEach((select, index) => {
      this.initSelItem(select, index + 1);
    });

    // events
    document.addEventListener(
      'click',
      function (e) {
        this.setActions(e);
      }.bind(this)
    );
    document.addEventListener(
      'keydown',
      function (e) {
        this.setActions(e);
      }.bind(this)
    );
    document.addEventListener(
      'focusin',
      function (e) {
        this.setActions(e);
      }.bind(this)
    );
    document.addEventListener(
      'focusout',
      function (e) {
        this.setActions(e);
      }.bind(this)
    );
  }
  // single select item initialization
  initSelItem(relativeSel, index) {
    const _this = this;
    const select = document.createElement('div');

    select.classList.add(this.classes.SELECT);
    relativeSel.parentNode.insertBefore(select, relativeSel);
    select.appendChild(relativeSel);
    relativeSel.hidden = true;
    index ? (relativeSel.dataset.selId = index) : null;

    if (this.getPlaceholder(relativeSel)) {
      relativeSel.dataset.optPlaceholder =
        this.getPlaceholder(relativeSel).value;
      if (this.getPlaceholder(relativeSel).label.show) {
        const selTitle = this.getSelect(select, this.classes.TITLE).twinSel;
        selTitle.insertAdjacentHTML(
          'afterbegin',
          `<span class="${this.classes.LABEL}">${
            this.getPlaceholder(relativeSel).label.text
              ? this.getPlaceholder(relativeSel).label.text
              : this.getPlaceholder(relativeSel).value
          }</span>`
        );
      }
    }
    select.insertAdjacentHTML(
      'beforeend',
      `<div class="${this.classes.BODY}">
                    <div ${
                      !relativeSel.hasAttribute('data-no-slide') ? 'hidden' : ''
                    }  class="${this.classes.OPTIONS}">

                    </div>
                </div>`
    );

    this.build(relativeSel);

    relativeSel.dataset.speed = relativeSel.dataset.speed
      ? relativeSel.dataset.speed
      : '150';
    relativeSel.addEventListener('change', function (e) {
      _this.initSelections(e);
    });
  }
  // select build
  build(relativeSel) {
    const select = relativeSel.parentElement;

    // set id
    select.dataset.selId = relativeSel.dataset.selId;
    // set value
    this.setValue(select, relativeSel);
    // set options
    this.setOptions(select, relativeSel);
    // set css modificator
    relativeSel.dataset.selAddonClass
      ? select.classList.add(`select_${relativeSel.dataset.selAddonClass}`)
      : null;
    // set class if select is multiple
    relativeSel.multiple
      ? select.classList.add(this.classes.HAS_MULTIPLE)
      : select.classList.remove(this.classes.HAS_MULTIPLE);
    // set class if select checkboxes are set
    relativeSel.hasAttribute('data-sel-checkboxes') && relativeSel.multiple
      ? select.classList.add(this.classes.HAS_CHECKBOX)
      : select.classList.remove(this.classes.HAS_CHECKBOX);
    // disable select
    this.disableSelect(select, relativeSel);
    // set search actions if data-sel-search is set
    relativeSel.hasAttribute('data-sel-search')
      ? this.setSearchActions(select)
      : null;
    // set select actions if it's initially opened
    relativeSel.hasAttribute('data-sel-opened') ? this.setAction(select) : null;

    // set select hint
    if (relativeSel.dataset.selHint) {
      relativeSel.parentElement.insertAdjacentHTML(
        'beforeend',
        `<div class="select__hint">${relativeSel.dataset.selHint}</div>`
      );
    }

    // show / hide selection from select title
    if (relativeSel.hasAttribute('data-show-val')) {
      select.classList.add('_select-show-val');
    } else {
      select.classList.remove('_select-show-val');
    }
  }
  // set twin select title value
  setValue(select, relativeSel) {
    const selBody = this.getSelect(select, this.classes.BODY).twinSel;
    const selTitle = this.getSelect(select, this.classes.TITLE).twinSel;

    if (selTitle) selTitle.remove();
    selBody.insertAdjacentHTML(
      'afterbegin',
      this.getValue(select, relativeSel)
    );
  }
  // set twin select options
  setOptions(select, relativeSel) {
    const _this = this;
    const options = this.getSelect(select, this.classes.OPTIONS).twinSel;
    const relativeSelOptions = this.getSelect(
      select,
      this.classes.OPTIONS
    ).relativeSel;
    options.innerHTML = this.getOptions(relativeSel);
    window.addEventListener('resize', function () {
      _this.getOptions(relativeSel);
    });
    if (relativeSelOptions.querySelector('[selected]')) {
      options
        .querySelector(`.${this.classes.OPTION}`)
        .classList.add(this.classes.IS_SELECTED);
    }
  }
  // disable select
  disableSelect(select, relativeSel) {
    if (relativeSel.disabled) {
      select.classList.add(this.classes.IS_DISABLED);
      this.getSelect(select, this.classes.TITLE).twinSel.disabled = true;
    } else {
      select.classList.remove(this.classes.IS_DISABLED);
      this.getSelect(select, this.classes.TITLE).twinSel.disabled = false;
    }
  }

  // main actions -----------------------------------------------------------

  // set main actions
  setActions(e) {
    const target = e.target;
    const type = e.type;

    if (
      target.closest(this.getClass(this.classes.SELECT)) ||
      target.closest(this.getClass(this.classes.HAS_LIST))
    ) {
      const select = target.closest('.select')
        ? target.closest('.select')
        : document.querySelector(
            `.${this.classes.sel}[data-sel-id="${
              target.closest(this.getClass(this.classes.HAS_LIST)).dataset
                .selectId
            }"]`
          );
      const relativeSel = this.getSelect(select).relativeSel;
      if (type === 'click') {
        if (!relativeSel.disabled) {
          if (target.closest(this.getClass(this.classes.HAS_LIST))) {
            const selList = target.closest(
              this.getClass(this.classes.HAS_LIST)
            );
            const selOption = document.querySelector(
              `.${this.classes.SELECT}[data-sel-id="${selList.dataset.selId}"] .select__option[data-opt-val="${selList.dataset.optVal}"]`
            );
            this.setOptionAction(select, relativeSel, selOption);
          } else if (target.closest(this.getClass(this.classes.TITLE))) {
            this.setAction(select);
          } else if (target.closest(this.getClass(this.classes.OPTION))) {
            const selOption = target.closest(
              this.getClass(this.classes.OPTION)
            );
            this.setOptionAction(select, relativeSel, selOption);
          }
        }
      } else if (type === 'focusin' || type === 'focusout') {
        if (target.closest(this.getClass(this.classes.SELECT))) {
          if (type === 'focusin') {
            select.classList.add(this.classes.IS_FOCUSED);
          } else {
            select.classList.remove(this.classes.IS_FOCUSED);
            if (relativeSel.hasAttribute('data-validate')) {
              if (!select.classList.contains(this.classes.IS_FILLED)) {
                this.addErr(relativeSel, select);
              } else {
                this.removeErr(relativeSel, select);
              }
            }
          }
        }
      } else if (type === 'keydown' && e.code === 'Escape') {
        this.closeGroup();
      }
    } else {
      this.closeGroup();
    }
  }
  // set single select action
  setAction(select) {
    const relativeSel = this.getSelect(select).relativeSel;
    const selOptions = this.getSelect(select, this.classes.OPTIONS).twinSel;

    if (relativeSel.closest('[data-select-single]')) {
      const selectOneGroup = relativeSel.closest('[data-select-single]');
      this.closeGroup(selectOneGroup, relativeSel);
    }

    if (!selOptions.classList.contains('_slide')) {
      select.classList.toggle(this.classes.IS_OPENED);
      if (!relativeSel.hasAttribute('data-no-slide'))
        _slideToggle(selOptions, relativeSel.dataset.speed);
      if (
        select.classList.contains(this.classes.IS_OPENED) &&
        relativeSel.hasAttribute('data-validate') &&
        select.classList.contains(this.classes.HAS_ERROR)
      ) {
        this.removeErr(relativeSel, select);
      }
    }
  }
  // close single select group
  closeGroup(group, select) {
    const selGroup = group ? group : document;
    const selections = selGroup.querySelectorAll(
      `${this.getClass(this.classes.SELECT)}${this.getClass(
        this.classes.IS_OPENED
      )}`
    );
    if (selections.length) {
      selections.forEach(selection => {
        if (
          !select ||
          (select && selection.dataset.selId !== select.dataset.selId)
        ) {
          this.closeItem(selection);
        }
      });
    }
  }
  // close single select item
  closeItem(select) {
    const relativeSel = this.getSelect(select).relativeSel;
    const selOptions = this.getSelect(select, this.classes.OPTIONS).twinSel;

    if (!selOptions.classList.contains('_slide')) {
      select.classList.remove(this.classes.IS_OPENED);
      if (!relativeSel.hasAttribute('data-no-slide'))
        _slideUp(selOptions, relativeSel.dataset.speed);
    }
  }
  // set single option actions
  setOptionAction(select, relativeSel, option) {
    if (relativeSel.multiple) {
      option.classList.toggle(this.classes.IS_SELECTED);
      const relativeSelections = this.getData(relativeSel).elements;

      relativeSelections.forEach(relativeSelection => {
        relativeSelection.removeAttribute('selected');
      });

      const twinSelections = select.querySelectorAll(
        this.getClass(this.classes.IS_SELECTED)
      );
      twinSelections.forEach(twinSelection => {
        relativeSel
          .querySelector(`option[value="${twinSelection.dataset.optVal}"]`)
          .setAttribute('selected', 'selected');
      });
      if (!option.classList.contains(this.classes.IS_SELECTED)) {
        console.log(
          relativeSel.querySelector(`option[value="${option.dataset.optVal}"]`)
        );
        relativeSel
          .querySelector(`option[value="${option.dataset.optVal}"]`)
          .removeAttribute('selected');
      }
    } else {
      select
        .querySelectorAll('.select__option')
        .forEach(opt => opt.classList.remove(this.classes.IS_SELECTED));
      option.classList.add(this.classes.IS_SELECTED);
      if (!relativeSel.hasAttribute('data-show-selection')) {
        if (
          select.querySelector(`${this.getClass(this.classes.OPTION)}[hidden]`)
        ) {
          select.querySelector(
            `${this.getClass(this.classes.OPTION)}[hidden]`
          ).hidden = false;
        }
        option.hidden = true;
      }
      relativeSel.value = option.hasAttribute('data-opt-val')
        ? option.dataset.optVal
        : option.textContent;
      this.setAction(select);
    }
    this.setValue(select, relativeSel);
    this.setSelections(relativeSel);
  }
  // set search actions
  setSearchActions(select) {
    const _this = this;
    const selInput = this.getSelect(select, this.classes.INPUT).twinSel;
    const selOptions = this.getSelect(
      select,
      this.classes.OPTIONS
    ).twinSel.querySelectorAll(`.${this.classes.OPTION}`);

    selInput.addEventListener('input', function () {
      selOptions.forEach(selOption => {
        if (
          selOption.textContent
            .toUpperCase()
            .indexOf(selInput.value.toUpperCase()) >= 0
        ) {
          selOption.hidden = false;
        } else {
          selOption.hidden = true;
        }
      });
      selOptions.hidden === true ? _this.setAction(select) : null;
    });
  }
  // set select subtitle
  setSubtitle(relativeSel) {}

  // validation -------------------------------------------------------------

  // add an error to a select
  addErr(relativeSel, select) {
    select.classList.add(this.classes.HAS_ERROR);

    if (relativeSel.dataset.selError && !relativeSel.dataset.selHint) {
      relativeSel.parentElement.insertAdjacentHTML(
        'beforeend',
        `<div class="select__hint">${relativeSel.dataset.selError}</div>`
      );
    }
  }
  // remove an error from a select
  removeErr(relativeSel, select) {
    if (select.classList.contains(this.classes.HAS_ERROR)) {
      select.classList.remove(this.classes.HAS_ERROR);
    }
    if (
      relativeSel.parentElement.querySelector('.select__hint') &&
      !relativeSel.dataset.selHint
    ) {
      relativeSel.parentElement.removeChild(
        relativeSel.parentElement.querySelector('.select__hint')
      );
    }
  }

  // utils ------------------------------------------------------------------

  // get custom class
  getClass(cssClass) {
    return `.${cssClass}`;
  }
  // get single select item
  getSelect(select, cssClass) {
    return {
      relativeSel: select.querySelector('select'),
      twinSel: select.querySelector(this.getClass(cssClass)),
    };
  }
  // get selected item value
  getValue(select, relativeSel) {
    let attr,
      attrClass,
      titleVal = this.getData(relativeSel, 2).html;

    // set title value
    titleVal = titleVal.length
      ? titleVal
      : relativeSel.dataset.selLabel
      ? relativeSel.dataset.selLabel
      : '';

    // set active class to select if it contains any values
    if (this.getData(relativeSel).values.length) {
      select.classList.add(this.classes.IS_ACTIVE);
    } else {
      select.classList.remove(this.classes.IS_ACTIVE);
    }

    // set select label
    if (relativeSel.hasAttribute('data-sel-label')) {
      attr = relativeSel.dataset.selLabel
        ? ` data-sel-label="${relativeSel.dataset.selLabel}"`
        : ` data-sel-label="Выбор"`;
      attrClass = ` ${this.classes.HAS_LABEL}`;
    }

    // push selections to the list inside of select title
    if (relativeSel.multiple && relativeSel.hasAttribute('data-sel-list')) {
      titleVal = this.getData(relativeSel)
        .elements.map(
          option =>
            `<span data-opt-id="${select.dataset.selId}" data-opt-val="${
              option.value
            }" class="_list-item">${this.getContent(option)}</span>`
        )
        .join('');

      if (
        relativeSel.dataset.list &&
        document.querySelector(relativeSel.dataset.list)
      ) {
        document.querySelector(relativeSel.dataset.list).innerHTML = titleVal;
        if (relativeSel.hasAttribute('data-sel-search')) titleVal = false;
      }
    }

    // init select search
    if (relativeSel.hasAttribute('data-sel-search')) {
      return `<div class="${this.classes.TITLE}"><span ${attr} class="${this.classes.VALUEUE}"><input autocomplete="off" type="search" placeholder="${titleVal}" data-placeholder="${titleVal}" class="${this.classes.INPUT}"></span></div>`;
    } else {
      const customClass =
        this.getData(relativeSel).elements.length &&
        this.getData(relativeSel).elements[0].dataset.optClass
          ? ` ${this.getData(relativeSel).elements[0].dataset.optClass}`
          : '';
      return `<button type="button" class="${this.classes.TITLE}"><span ${
        attr ? attr : ''
      } class="${this.classes.VALUE} ${
        attrClass ? attrClass : ''
      }"><span class="${
        this.classes.CONTENT
      }${customClass}">${titleVal}</span></span></button>`;
    }
  }
  // get options
  getOptions(relativeSel) {
    const selScroll = relativeSel.hasAttribute('data-sel-scroll')
      ? `data-simplebar`
      : '';
    const data = selScroll
      ? relativeSel.dataset.selScroll.trim().split(',')
      : null;
    let selScrollHeight =
      relativeSel.dataset.selScroll && data
        ? `style="max-height:${window.innerWidth > 768 ? data[0] : data[1]}rem"`
        : '';
    let selOptions = Array.from(relativeSel.options);

    if (selOptions.length) {
      let selOptionsHTML = ``;

      if (
        (this.getPlaceholder(relativeSel) &&
          !this.getPlaceholder(relativeSel).show) ||
        relativeSel.multiple
      ) {
        selOptions = selOptions.filter(option => option.value);
      }
      selOptionsHTML += selScroll
        ? `<div ${selScroll} ${selScrollHeight} data-sel-scroll="${relativeSel.dataset.selScroll}" class="${this.classes.SCROLL}">`
        : '';
      selOptions.forEach(option => {
        selOptionsHTML += this.getOption(option, relativeSel);
      });
      selOptionsHTML += selScroll ? `</div>` : '';
      return selOptionsHTML;
    }
  }
  // get option
  getOption(option, relativeSel) {
    const selections =
      option.selected && relativeSel.multiple
        ? ` ${this.classes.IS_SELECTED}`
        : '';
    const showSelection =
      option.selected &&
      !relativeSel.hasAttribute('data-show-selection') &&
      !relativeSel.multiple
        ? `hidden`
        : ``;
    const optionClass = option.dataset.optClass
      ? ` ${option.dataset.optClass}`
      : '';
    const optionLink = option.dataset.optionLink
      ? option.dataset.optionLink
      : false;
    const optionLinkTarget = option.hasAttribute('data-option-link-target')
      ? `target="_blank"`
      : '';
    let optionHTML = ``;

    optionHTML += optionLink
      ? `<a ${optionLinkTarget} ${showSelection} href="${optionLink}" data-opt-val="${option.value}" class="${this.classes.OPTION}${optionClass}${selections}">`
      : `<button ${showSelection} class="${this.classes.OPTION}${optionClass}${selections}" data-opt-val="${option.value}" type="button">`;
    optionHTML += this.getContent(option);
    optionHTML += optionLink ? `</a>` : `</button>`;
    return optionHTML;
  }
  // get select content
  getContent(option) {
    const optionData = option.dataset.optAsset
      ? `${option.dataset.optAsset}`
      : '';
    const optionDataHTML =
      optionData.indexOf('img') >= 0
        ? `<img src="${optionData}" alt="">`
        : optionData;
    let optionContentHTML = ``;

    optionContentHTML += optionData
      ? `<span class="${this.classes.GROUP}">`
      : '';
    optionContentHTML += optionData
      ? `<span class="${this.classes.ASSET}">`
      : '';
    optionContentHTML += optionData ? optionDataHTML : '';
    optionContentHTML += optionData ? `</span>` : '';
    optionContentHTML += optionData ? `<span class="${this.classes.TXT}">` : '';
    optionContentHTML += option.textContent;
    optionContentHTML += optionData ? `</span>` : '';
    optionContentHTML += optionData ? `</span>` : '';
    return optionContentHTML;
  }
  // get select placeholder
  getPlaceholder(relativeSel) {
    const placeholder = Array.from(relativeSel.options).find(
      option => !option.value
    );

    if (placeholder) {
      placeholder.classList.add(this.classes.subtitle);
      return {
        value: placeholder.textContent,
        show: placeholder.hasAttribute('data-sel-ph-show'),
        label: {
          show: placeholder.hasAttribute('data-sel-ph'),
          text: placeholder.dataset.optPlaceholder,
        },
      };
    }
  }
  // get selected options data
  getData(relativeSel) {
    let selections = [];

    if (relativeSel.multiple) {
      selections = Array.from(relativeSel.options)
        .filter(option => option.value)
        .filter(option => option.selected);
    } else {
      selections.push(relativeSel.options[relativeSel.selectedIndex]);
    }
    return {
      elements: selections.map(option => option),
      values: selections
        .filter(option => option.value)
        .map(option => option.value),
      html: selections.map(option => this.getContent(option)),
    };
  }

  // selections -------------------------------------------------------------

  // init selections
  initSelections(e) {
    const relativeSel = e.target;

    this.build(relativeSel);
    this.setSelections(relativeSel);
  }
  // set selections
  setSelections(relativeSel) {
    const select = relativeSel.parentElement;

    if (relativeSel.hasAttribute('data-submit') && relativeSel.value) {
      let tempButton = document.createElement('button');
      tempButton.type = 'submit';
      relativeSel.closest('form').append(tempButton);
      tempButton.click();
      tempButton.remove();
    }
    relativeSel.parentElement.classList.add(this.classes.IS_FILLED);
    this.selection(select, relativeSel);
  }
  // custom select event (listen to any selections / mutations)
  selection(select, relativeSel) {
    document.dispatchEvent(
      new CustomEvent('selection', {
        detail: {
          select: relativeSel,
        },
      })
    );
  }
}

new Select({});

// --------------------------------------------------------------------------

if (document.querySelectorAll('[data-simplebar]').length) {
  document.querySelectorAll('[data-simplebar]').forEach(scrollBlock => {
    new SimpleBar(scrollBlock, {
      autoHide: false,
    });
  });
}

// --------------------------------------------------------------------------
