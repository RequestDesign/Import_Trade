export const markersCollection = [
    {
        coordinate: [37.744620999999974, 55.703251069020546]
    }
];

async function initMap() {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapCenterLocation } = ymaps3;
    const map = new YMap(document.getElementById('contacts-map'), {
        location: {
            center: [37.744620999999974, 55.703251069020546],
            zoom: 11
        },
        behaviors: ['drag']
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));

    markersCollection.forEach((el) => {
        let content = document.createElement('div');
        content.dataset.index = el.idx;
        content.classList.add('marker', el.type);
        content.insertAdjacentHTML(
            'beforeend',
            `
										<svg width="48" height="68" viewBox="0 0 48 68" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M24.0003 32.4074C21.7902 32.4074 19.6706 31.5294 18.1078 29.9666C16.545 28.4038 15.667 26.2842 15.667 24.0741C15.667 21.8639 16.545 19.7443 18.1078 18.1815C19.6706 16.6187 21.7902 15.7407 24.0003 15.7407C26.2105 15.7407 28.3301 16.6187 29.8929 18.1815C31.4557 19.7443 32.3337 21.8639 32.3337 24.0741C32.3337 25.1684 32.1181 26.252 31.6993 27.2631C31.2805 28.2741 30.6667 29.1928 29.8929 29.9666C29.1191 30.7404 28.2004 31.3543 27.1894 31.7731C26.1783 32.1918 25.0947 32.4074 24.0003 32.4074ZM24.0003 0.740723C17.8119 0.740723 11.877 3.19905 7.50117 7.5749C3.12532 11.9507 0.666992 17.8857 0.666992 24.0741C0.666992 41.5741 24.0003 67.4074 24.0003 67.4074C24.0003 67.4074 47.3337 41.5741 47.3337 24.0741C47.3337 17.8857 44.8753 11.9507 40.4995 7.5749C36.1236 3.19905 30.1887 0.740723 24.0003 0.740723Z" fill="#DA251E"/>
										</svg>
                  `
        );
        const marker = new YMapMarker(
            { coordinates: el.coordinate, draggable: false, offset: ['-50%', '-50%'] },
            content
        );
        map.addChild(marker);
    });
}

if (document.getElementById('contacts-map')) {
    initMap();
}
