const replaceList = ['match', 'vidsugar.resumePlayback', 'getItem', 'localStorage', 'parse', 'length', 'keys', 'vid', 'findIndex', 'push', 'shift', 'stringify', 'setItem', 'click', '#choose-sever', 'toggle', '.list-server', 'on', 'body', '.server-option', 'active', 'removeClass', 'li.active', 'addClass', 'data-server', 'attr', 'data-link', 'ready', 'remove', 'player', '', 'html', '#player', 'show', '#loading-effect', 'linkPlay', '.mp4', 'indexOf', 'type', 'mp4', '.m3u8', 'hls', 'cloud.vidsugar.com', 'vod.vidsugar.com', 'maxTouchPoints', 'userAgent', 'test', 'platform', 'MacIntel', 'iPad', 'chunklist.m3u8', 'api.json', 'replace', 'GET', 'json', 'ajax', '<iframe src="', '" width="', '" height="', '" allow="autoplay" frameborder="0"  allowfullscreen></iframe>', '\\?d', '//cloud.mpapis.xyz/api', 'POST', '<li class="server-option" data-server="', '" data-link="', '">Server ', '</li>', 'append', 'li[class=server-option]:contains("Server TP HCM")', '.server-option[data-server=1]', '.tip-change-server', 'document', 'parent', 'fadeOut', 'reload', 'pre', '00:00:01:000', 'vast', 'Quảng cáo còn XX giây.', 'Bỏ qua quảng cáo', 'Bỏ qua sau xxs', 'html5', '/jwplayer/mpplayer.png', 'top-right', 'false', '30', 'setup', 'error', 'getPosition', 'Mạng gặp vấn đề hoặc file bị lỗi !<br/> Hãy thử tắt trình duyệt và truy cập lại website.', '.jw-error-text', 'Trình phát đang thử kết nối lại ...', 'adError', 'skipAd', 'play', 'adComplete', '.vast-manual-skip', '.vast-count-ads', 'adSkipped', 'adTime', 'position', '<div class="vast-manual-skip">Bỏ qua quảng cáo</div>', 'adPlay', 'getVolume', 'setVolume', 'adBreakStart', '<div class="vast-count-ads">Quảng cáo ', '/', '</div>', 'time', 'floor', 'volume', 'set', 'complete', 'autonext', 'top', 'seeked', 'seek', 'offset', 'getDuration', 'beforePlay', 'get', 'hide', './skip-forward.svg', 'Tua 1 đoạn 90s', 'addButton', './forward.svg', 'Tua 10s', './backward.svg', 'Tua lại 10s', 'location', 'origin'];

const text = await Deno.readTextFile("./index.html");

let _text = text;
replaceList.forEach((item, index) => {
  _text = _text.replaceAll(`_0xb4f2[${index}]`, item);
});

console.log(_text);
await Deno.writeTextFile("./index2.html", _text);
