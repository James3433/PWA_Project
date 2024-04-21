const CACHE_NAME = "note-add-v1";

// Use the install event to pre-cache all initial resources.
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      console.log("Service Worker: Installing...");
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        "index.html",
        "css/style.css",
        "manifest.json",
        "js/note.js",
        // Add other initial resources to cache here
      ]);
      console.log("Service Worker: Cached initial resources");
    })()
  );
});


// Activate and fetch events remain the same
self.addEventListener("activate", (event) => {
  console.log('Old catche delete');
  event.waitUntil(
      caches.keys().then(keys =>  {
        return Promise.all(keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
          );
      })
    );
});

// Intercept fetch requests and serve from cache if available, otherwise fetch from network and cache the response.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const fetchResponse = await fetch(event.request);
        // Only cache GET requests
        if (event.request.method === "GET") {
          cache.put(event.request, fetchResponse.clone());
        }
        return fetchResponse;
      } catch (e) {
        // The network request failed, try to retrieve data from cache
        const cachedData = await cache.match("data");
        if (cachedData) {
          return cachedData;
        } else {
          console.error("Fetch request failed and no cached data available:", e);
          throw e;
        }
      }
    })()
  );
}); 
