//Notificaciones
const notificarConexion = () => {
    if (Notification.permission === 'granted') {
        new Notification('Se detecto que no tienes conexion a internet. Tu nota se procesara cuando tengas conexion.')
    } else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
        Notification.requestPermission((permission) => {
            if (permission === 'granted') {
                new Notification('Se detecto que no tienes conexion a internet. Tu nota se procesara cuando tengas conexion.')
            }
        })
    }
}


export {
    notificarConexion
}