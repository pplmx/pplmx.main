(function () {
    change();
})();

function change() {
    // 获取当前日期
    const date = new Date().getDay();

    // 获取歌曲列表和歌曲标题
    const songList = [
        '乾坤鸣动',
        '飞雪玉花',
        '国色天香',
        '罗生堂下',
        '纵横天下',
        '谁主沉浮',
        '阴阳无极',
    ];
    const songTitle = [
        'universe',
        'snow_flower',
        'beautiful',
        'hall',
        'invincible',
        'dominate',
        'chaos',
    ];

    // 设置音频文件路径和歌曲标题
    const audio = document.getElementById('qin_moon_audio');
    audio.src = `qin_moon/${songTitle[date]}.mp3`;
    const songLi = document.getElementById('qin_moon_song');
    songLi.innerText = ` 秦时明月:${songList[date]}`;

    // 为 body 元素添加点击事件，点击时播放音乐
    document.body.addEventListener('click', playMusic);

    // 定义播放音乐函数
    function playMusic() {
        audio.play();
    }
}
