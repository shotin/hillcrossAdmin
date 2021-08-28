// Utilities 

import Vue from 'vue';

export const notify = (message, type, timer = 10000) => {
    let background = '';
    if (type === 'success') {
        // background = '#28a745';
    } else if (type === 'error') {
        // background = '#dc3545';
    } else {
        // background = '#17a2b8';
    }
    Vue.swal.fire({
        position: 'top-end',
        icon: type,
        html: message,
        toast: true,
        // background: background,
        timer: timer,
        customClass: {header: 'd-none', popup: 'popup-class '+type},
        showConfirmButton: false
    });
}

export const handleError = (error, withoutKey = null) => {
    if (error.response.data) {
        // console.log(typeof error.response.data)
        if (typeof error.response.data === 'object') {
            notify(error.response.data, 'error');
        }
        if(error.response.data.status === 'error') {
            notify(error.response.data.message, 'error');
        }
        if (error.response.status === 422) {
            let errors = [];
            for (var key in error.response.data.errors) {
                error.response.data.errors[key].forEach(element => {
                    errors.push(`${key}: ${element}`);
                });
            }
            notify(errors.join("\n"), 'error');
        }
        if (error.response.status === 418 && error.response.data.message) {
            notify(error.response.data, 'error');
        }
        if (error.response.status === 403) {
          console.log(error)
          notify(error.response.data.message, 'error');
        }
        if (error.response.status === 404) {
          notify('The api endpoint does not exists', 'error');
        }
    }else{
        notify('We could not handle your request', 'error');
    }
}

export const checkPermission = (permissions, checked_permission) => {
  // return permissions.includes(permission)
  return permissions.some(item => checked_permission.indexOf(item) !== -1);
}