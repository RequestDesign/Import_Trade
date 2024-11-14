/**
 * set hash to url
 * @param {string} hash
 */
export const setHash = (hash) => {
    hash = hash ? `#${hash}` : window.location.href.split('#')[0];
    history.pushState('', '', hash);
};

/**
 * get hash from url
 * @returns string
 */
export const getHash = () => {
    if (location.hash) {
        return location.hash.replace('#', '');
    }
};

/**
 * initializes hamburger menu
 */
export const menuInit = () => {
    const mm = window.matchMedia('(max-width: 768px)');

    if (document.querySelector('.hamburger')) {
        document.querySelector('.hamburger').addEventListener('click', function (e) {
            const isActive = document.documentElement.classList.contains('_menu-opened');
            if (bodyLockStatus && !isActive) {
                menuOpen();
                console.log(e.target);
            } else if (bodyLockStatus && isActive) {
                menuClose();
            }
        });

        mm.addEventListener('change', function () {
            if (!mm.matches && document.documentElement.classList.contains('_menu-opened')) menuClose();
        });
    }
};
/**
 * opens hamburger menu
 */
export const menuOpen = () => {
    bodyLock();
    document.documentElement.classList.add('_menu-opened');
};
/**
 * closes hamburger menu
 */
export const menuClose = () => {
    bodyUnlock();
    document.documentElement.classList.remove('_menu-opened');
};

// body lock
export let bodyLockStatus = true;
/**
 * toggles body lock
 * @param {number} delay
 */
export const bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains('lock')) {
        bodyUnlock(delay);
    } else {
        bodyLock(delay);
    }
};
/**
 * unlocks body
 * @param {number} delay
 */
export const bodyUnlock = (delay = 500) => {
    if (bodyLockStatus) {
        setTimeout(() => {
            document.documentElement.classList.remove('lock');
        }, delay);
        bodyLockStatus = false;
        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
};
/**
 * locks body
 * @param {number} delay
 */
export const bodyLock = (delay = 500) => {
    if (bodyLockStatus) {
        document.documentElement.classList.add('lock');

        bodyLockStatus = false;
        setTimeout(function () {
            bodyLockStatus = true;
        }, delay);
    }
};

/**
 * make the array unique
 * @param {array} array
 * @returns
 */
export function uniqueArray(array) {
    return array.filter(function (item, index, self) {
        return self.indexOf(item) === index;
    });
}

/**
 *
 * @param {array} array
 * @param {number} dataSetValue
 * process media requests from attributes
 */
export const dataMediaQueries = (array, dataSetValue) => {
    // get objects with media queries
    const media = Array.from(array).filter(function (item, index, self) {
        if (item.dataset[dataSetValue]) {
            return item.dataset[dataSetValue].split(',')[0];
        }
    });
    // objects with media queries initialization
    if (media.length) {
        const breakpointsArray = [];
        media.forEach((item) => {
            const params = item.dataset[dataSetValue];
            const breakpoint = {};
            const paramsArray = params.split(',');
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });
        // get unique breakpoints
        let mdQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
        });
        mdQueries = uniqueArray(mdQueries);
        const mdQueriesArray = [];

        if (mdQueries.length) {
            // work with every breakpoint
            mdQueries.forEach((breakpoint) => {
                const paramsArray = breakpoint.split(',');
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);
                // objects with conditions
                const itemsArray = breakpointsArray.filter(function (item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    }
                });
                mdQueriesArray.push({
                    itemsArray,
                    matchMedia
                });
            });
            return mdQueriesArray;
        }
    }
};

/**
 * smoothly slides up
 * @param {HTMLElement} target
 * @param {number} duration
 * @param {boolean} showmore
 */
export const _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}rem` : `0`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty('height') : null;
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            !showmore ? target.style.removeProperty('overflow') : null;
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // create event
            document.dispatchEvent(
                new CustomEvent('slideUpDone', {
                    detail: {
                        target: target
                    }
                })
            );
        }, duration);
    }
};

/**
 * smoothly slides down
 * @param {HTMLElement} target
 * @param {number} duration
 * @param {boolean} showmore
 */
export const _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.hidden = target.hidden ? false : null;
        showmore ? target.style.removeProperty('height') : null;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = showmore ? `${showmore}rem` : `0`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
            // create event
            document.dispatchEvent(
                new CustomEvent('slideDownDone', {
                    detail: {
                        target: target
                    }
                })
            );
        }, duration);
    }
};

/**
 * toggles smooth slide
 * @param {HTMLElement} target
 * @param {number} duration
 * @returns function
 */
export const _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};

/**
 * converts rem to pixels
 * @param {number} remValue
 * @returns string
 */
export function remToPx(remValue) {
    const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    const pxValue = remValue * htmlFontSize;

    return Math.round(pxValue) + 'px';
}

// remove class from all array elements
export const removeClasses = (array, className) => {
    for (var i = 0; i < array.length; i++) {
        array[i].classList.remove(className);
    }
};

/**
 * set current year
 */
export const setCurrentYear = () => {
    if (document.getElementById('currentYear')) {
        document.getElementById('currentYear').innerHTML = new Date().getFullYear();
    }
};
