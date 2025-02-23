// Archivo service-worker.js

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  // Puedes realizar operaciones de precaching aquí si es necesario
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  // Puedes realizar operaciones de limpieza de cache aquí si es necesario
});

// Intercepción de solicitudes de red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
