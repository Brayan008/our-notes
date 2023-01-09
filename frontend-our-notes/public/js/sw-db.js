// Utilidades para grabar PouchDB
var db = new PouchDB('notas');

function guardarNotas(nota){
    nota._id = new Date().toISOString();
    return db.put(nota).then(()=>{
        self.registration.sync.register('nuevo-post');

        
        const newResp = {ok: true, offline: true, message: "Nota guardada correctamente"};

        return new Response(JSON.stringify(newResp));
        
    })
}

//Postear nota en la API
function postearNota(){
    const posteos = [];

    return db.allDocs({include_docs: true}).then(docs=>{

        docs.rows.forEach( row => {
            const doc = row.doc;

            const fetchPom = fetch('http://localhost:8080/api/note', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( doc )
            }).then( res =>{
                return db.remove(doc);
            });

            posteos.push(fetchPom);
        });

        return Promise.all(posteos);

    })
}