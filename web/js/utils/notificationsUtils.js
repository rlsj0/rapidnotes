export function notifyOK(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
            color: '#1F818C',
            background: '#EffA5D',
            border: '2px solid #1F818C',
            borderRadius: '5px'
        }
    }).showToast();
}


export function notifyKO(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'bottom',
        position: 'right',
        style: {
            color: '#FFFFFF',
            background: '#dc3545',
            border: '2px solid #FFFFFF',
            borderRadius: '5px'
        }
    }).showToast();
}