const CACHE_NAME="invoice-manager-v1"

const urlsToCache=[
"./",
"./index.html",
"./manifest.json",
"./icons/icon-192.png",
"./icons/icon-512.png"
]

self.addEventListener("install",event=>{
event.waitUntil(
caches.open(CACHE_NAME).then(cache=>{
return cache.addAll(urlsToCache)
})
)
})

self.addEventListener("activate",event=>{
event.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
)
})
)
})

self.addEventListener("fetch",event=>{
event.respondWith(
caches.match(event.request).then(res=>{
return res||fetch(event.request)
})
)
})


