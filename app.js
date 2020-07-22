(() => {
    // Check that service workers are supported
    if ('serviceWorker' in navigator) {
        // attach event listener on page l aod
        window.addEventListener('load', () => {
            // register serviceWorker with the [sw.js] file
            navigator.serviceWorker.register('/sw.js').then(
                (registration) => {
                    console.log(
                        '[Service Worker] Registered on ',
                        registration.scope
                    );
                },
                (error) => {
                    // registration failed :(
                    console.log('[Service Worker] Registered Failed: ', error);
                }
            );
        });
    }
})();

function change() {
    const song = [
        '乾坤鸣动',
        '飞雪玉花',
        '国色天香',
        '罗生堂下',
        '纵横天下',
        '谁主沉浮',
        '阴阳无极',
    ];
    const songLetter = [
        'universe',
        'snow_flower',
        'beautiful',
        'hall',
        'invincible',
        'dominate',
        'chaos',
    ];
    const date = new Date().getDay();
    const audio = document.getElementsByTagName('audio')[0];
    const songLi = document.getElementsByClassName('song')[0];
    for (let i = 0; i < song.length; i++) {
        if (i === date) {
            audio.src = `qin_moon/${songLetter[date]}.mp3`;
            songLi.innerText = ` 秦时明月:${song[date]}`;
            break;
        }
    }
}
