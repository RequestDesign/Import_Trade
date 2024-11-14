import Inputmask from 'inputmask';

// --------------------------------------------------------------------------

const initInputmask = () => {
    const telInputCollection = document.querySelectorAll('[data-tel-mask]');

    if (telInputCollection.length) {
        telInputCollection.forEach((input) => {
            Inputmask({ mask: '+7 (999) 999-99-99', showMaskOnHover: false, clearIncomplete: true }).mask(
                input
            );
        });
    }
};
initInputmask();
