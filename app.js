(function () {
    // 歌曲列表
    const songs = [
        { title: '乾坤鸣动', file: 'universe' },
        { title: '飞雪玉花', file: 'snow_flower' },
        { title: '国色天香', file: 'beautiful' },
        { title: '罗生堂下', file: 'hall' },
        { title: '纵横天下', file: 'invincible' },
        { title: '谁主沉浮', file: 'dominate' },
        { title: '阴阳无极', file: 'chaos' },
    ];

    // 缓存 DOM 元素
    const audio = document.getElementById('qin_moon_audio');
    const songLi = document.getElementById('qin_moon_song');

    // 获取当前日期对应的歌曲
    const { title, file } = songs[new Date().getDay()];

    // 更新音频源和显示的歌曲标题
    audio.src = `qin_moon/${file}.mp3`;
    songLi.innerText = `秦时明月: ${title}`;

    // 添加点击事件以播放音乐
    document.body.addEventListener('click', () => audio.play(), { once: true });
})();
