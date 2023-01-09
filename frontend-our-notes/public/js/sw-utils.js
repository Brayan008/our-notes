// Guardar  en el cache dinamico
function actualizaCacheDinamico(cacheDinamico, req, res) {
    if (res.ok) {
        return caches.open(cacheDinamico).then(cache => {
            cache.put(req, res.clone());
            return res.clone();
        });
    } else {
        return res;
    }
}

// Cache actualización con la red
function actualizaCacheStatico(estaticoCache, req, APP_SHELL_INMUTABLE) {
    if (APP_SHELL_INMUTABLE.includes(req.url)) {
        // No hace falta actualizar el inmutable
        // console.log('existe en inmutable', req.url );
    } else {

        return fetch(req)
            .then(res => {
                return actualizaCacheDinamico(estaticoCache, req, res);
            });
    }
}

function manejoApi(cacheName, req) {

    if (req.clone().method === 'POST' && !navigator.onLine) {
        if(self.registration.sync){
            return req.clone().text().then(body =>{
                const bodyObj = JSON.parse(body)
                return guardarNotas(bodyObj)
            })
        }else{
            return fetch(req);
        }

    } else {
        return fetch(req).then(res => {
            if (res.ok) {
                actualizaCacheDinamico(cacheName, req, res.clone())
                return res.clone()
            } else {
                return caches.match(req)
            }
        }).catch(err => {
            return caches.match(req)
        })
    }
}