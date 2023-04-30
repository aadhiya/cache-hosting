const CACHE_NAME = 'audio-cache';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(['./elon.mp3']);
    })
  );
});

self.addEventListener('fetch', function(event) {
  const request = event.request;

  if (request.method === 'GET' && request.url.endsWith('.mp3')) { // replace '.mp3' with the file type of your audio files
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(request).then(function(response) {
          if (response) {
            return response;
          }

          return fetch(request).then(function(response) {
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
