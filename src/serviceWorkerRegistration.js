
// const isLocalhost = Boolean(
//     window.location.hostname === 'localhost' ||
//     window.location.hostname === '[::1]' ||
//     window.location.hostname.match(
//       /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/
//     )
//   );
  
//   export function register(config) {
//     if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//       const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
//       if (publicUrl.origin !== window.location.origin) {
//         return;
//       }
  
//       window.addEventListener('load', () => {
//         const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
//         if (isLocalhost) {
//           checkValidServiceWorker(swUrl, config);
//         } else {
//           registerValidSW(swUrl, config);
//         }
//       });
//     }
//   }
  
//   function registerValidSW(swUrl, config) {
//     navigator.serviceWorker
//       .register(swUrl)
//       .then((registration) => {
//         if (config && config.onSuccess) {
//           config.onSuccess(registration);
//         }
//       })
//       .catch((error) => {
//         console.error('Service worker registration failed:', error);
//       });
//   }
  
//   function checkValidServiceWorker(swUrl, config) {
//     fetch(swUrl)
//       .then((response) => {
//         if (
//           response.status === 404 ||
//           response.headers.get('content-type').indexOf('javascript') === -1
//         ) {
//           navigator.serviceWorker.ready.then((registration) => {
//             registration.unregister().then(() => {
//               window.location.reload();
//             });
//           });
//         } else {
//           registerValidSW(swUrl, config);
//         }
//       })
//       .catch(() => {
//         console.log('No internet connection found. App is running in offline mode.');
//       });
//   }
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js')
//         .then((registration) => {
//           console.log('Service Worker registered with scope:', registration.scope);
//         })
//         .catch((error) => {
//           console.log('Service Worker registration failed:', error);
//         });
//     });
//   }
  
  
//   export function unregister() {
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.ready.then((registration) => {
//         registration.unregister();
//       });
//     }
//   }
  