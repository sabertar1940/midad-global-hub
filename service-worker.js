
"use strict";

/* ==========================================
   MIDAD GLOBAL HUB
   ADVANCED SERVICE WORKER
   VERSION 2.1.0
========================================== */

const CACHE_NAME = "midad-global-v2.1";

const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./security.js",
  "./manifest.json"
];

/* INSTALL */

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

/* ACTIVATE */

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) =>
              name.startsWith("midad-global-") &&
              name !== CACHE_NAME
            )
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

/* FETCH */

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const requestURL = new URL(request.url);

  if (requestURL.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request).then((response) => {
        if (
          !response ||
          response.status !== 200 ||
          response.type !== "basic"
        ) {
          return response;
        }

        const responseCopy = response.clone();

        event.waitUntil(
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, responseCopy))
        );

        return response;

      }).catch(() => {
        if (request.mode === "navigate") {
          return caches.match("./index.html");
        }

        return new Response("Offline - MIDAD Global Hub", {
          status: 503,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        });
      });
    })
  );
});
