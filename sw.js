var cacheID = 'mws-restaurant-stage-1';

//Files to catch

var urlsToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    'img/banners/1_1x.jpg',
    'img/banners/1_2x.jpg',
    'img/banners/2_1x.jpg',
    'img/banners/2_2x.jpg',
    'img/banners/3_1x.jpg',
    'img/banners/3_2x.jpg',
    'img/banners/4_1x.jpg',
    'img/banners/4_2x.jpg',
    'img/banners/5_1x.jpg',
    'img/banners/6_1x.jpg',
    'img/banners/6_2x.jpg',
    'img/banners/7_1x.jpg',
    'img/banners/7_2x.jpg',
    'img/banners/8_1x.jpg',
    'img/banners/8_2x.jpg',
    'img/banners/9_1x.jpg',
    'img/banners/9_2x.jpg',
    'img/banners/10_1x.jpg',
    'img/banners/10_2x.jpg',
    'img/tiles/1_1x.jpg',
    'img/tiles/1_2x.jpg',
    'img/tiles/2_1x.jpg',
    'img/tiles/2_2x.jpg',
    'img/tiles/3_1x.jpg',
    'img/tiles/3_2x.jpg',
    'img/tiles/4_1x.jpg',
    'img/tiles/4_2x.jpg',
    'img/tiles/5_1x.jpg',
    'img/tiles/5_2x.jpg',
    'img/tiles/6_1x.jpg',
    'img/tiles/6_2x.jpg',
    'img/tiles/7_1x.jpg',
    'img/tiles/7_2x.jpg',
    'img/tiles/8_1x.jpg',
    'img/tiles/8_2x.jpg',
    'img/tiles/9_1x.jpg',
    'img/tiles/9_2x.jpg',
    'img/tiles/10_1x.jpg',
    'img/tiles/10_2x.jpg'
    
    //add google fonts link
];


// Install Service Worker

self.addEventListener('install', function (event) {
    console.log("[ServiceWorker] Installed");

    //Delay the event until the Promise is resolved

    event.waitUntil(
        caches.open(cacheID).then(function (cache) {
            console.log("[ServiceWorker] Caching cacheFiles");
            return cache.addAll(urlsToCache);
        })
    );
    //event.waitUntil ended

});

self.addEventListener("fetch", function (event) {
    console.log("[ServiceWorker] Fetch", event.request.url);
    //Respond to the fetch event
    event.respondWith(
        caches.match(event.request)

            .then(function (response) {

                if (response) {
                    console.log("[ServiceWorker] Returning cached data");
                    return response;
                }


                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            console.log("[ServiceWorker] Error fetching data");
                            return response;
                        }

                        var responseClone = response.clone();

                        caches.open(cacheID)
                        .then(function(cache) {
                            cache.put(event.request, responseClone);
                            console.log("[ServiceWorker] New Data Cached", event.request.url);
                        });

                        return response;
                    }
                );

            }).catch(function (error) {
                console.log("[ServiceWorker] Error Fetching and Caching New Data", error);
            })
            );

})

