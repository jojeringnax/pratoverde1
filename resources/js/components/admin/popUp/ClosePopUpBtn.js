export default function ClosePopUp(changeStateParent) {
    document.querySelector('.layout-admin').classList.add('fadeout-layout');
    document.querySelector('.modal-web').classList.add('fadeout');

    document.querySelector('.layout-admin').classList.remove('fadein-layout');
    document.querySelector('.modal-web').classList.remove('fade-in');

    setTimeout(function() {
        document.querySelector('.layout-admin').classList.add('hide');
        document.querySelector('.modal-web').classList.add('hide');
        document.querySelector('.mod-wrapper').classList.add('hide');
    },999);

    changeStateParent();
}