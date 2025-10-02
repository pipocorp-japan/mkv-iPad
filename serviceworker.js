const CACHE_NAME = 'mkv-player-v1';
const urlsToCache = [
    '/',
    'index.html',
    'serviceworker.js',
    'mkv-demuxer.js' // 重要なデコーダーライブラリもキャッシュ
];

self.addEventListener('install', event => {
    // インストール時に必要なファイルをすべてキャッシュする
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    // ネットワークリクエストに対してキャッシュを優先して応答する
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // キャッシュがあればそれを使う
                if (response) {
                    return response;
                }
                // キャッシュがなければネットワークへ
                return fetch(event.request);
            })
    );
});
