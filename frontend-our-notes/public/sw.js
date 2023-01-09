importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js')

//Imports
importScripts('js/sw-db.js')
importScripts('js/sw-utils.js')

//Configuración del SW

//Crear constantes para almacenar el cache

const ESTATICO_CACHE = 'static-v3'
const DINAMICO_CACHE = 'dinamico-v1'
const INMUTABLE_CACHE = 'inmutable-v1'

const APP_SHELL = [
    '/',
    'index.html',
    'js/app.js',
    'js/sw-utils.js',
    'manifest.json'
]

const APP_SHELL_INMUTABLE = [
    'https://img.icons8.com/cute-clipart/64/000000/task.png',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+Mono&display=swap',
    'https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js'
]
//Proceso de instalación
self.addEventListener('install', event=>{
    const cacheStatic = caches.open(ESTATICO_CACHE).then(cache=> 
        cache.addAll(APP_SHELL))
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache=> 
            cache.addAll(APP_SHELL_INMUTABLE))
    
            event.waitUntil(Promise.all[cacheStatic,cacheInmutable])
})

//Proceso de activación
self.addEventListener('activate', event=>{
   
    //Eliminar el cache del sw anterior
    const respuesta = caches.keys().then(keys =>{
        keys.forEach(key =>{
            if (key !== ESTATICO_CACHE && key.includes('static')){
                return caches.delete(key)
            }
        })
    })
    event.waitUntil(respuesta)
})


//Estrategia de cache
self.addEventListener('fetch', event =>{

    let respuesta;

    if(event.request.url.includes('/api/note')){
        respuesta = manejoApi(DINAMICO_CACHE, event.request);
    }else{
    respuesta = caches.match(event.request).then( res => {
        if ( res ) {
            actualizaCacheStatico( ESTATICO_CACHE, event.request, APP_SHELL_INMUTABLE );
            return res;
        } else {
            return fetch( event.request ).then( newRes => { 
                return actualizaCacheDinamico(DINAMICO_CACHE, event.request, newRes );
            });
        }
    });

}
    
    event.respondWith(respuesta)
})

//Tareas asincronas
self.addEventListener('sync', event =>{
    console.log('SW: Sync');

    if(event.tag === 'nuevo-post'){
        console.log("Tarea posteada");
        
        //postear a BD cuando hay conexion
        const respuesta = postearNota();
        event.waitUntil(respuesta);
       


    }
})