var MU = (function () {
    var api = {};

    api.checkKey = function () {
        return !!localStorage.getItem('meetup_key');
    };
    api.getKey = function () {
        return JSON.parse(localStorage.getItem('meetup_key'))['key'];
    };

    api.setKey = function (key) {
        localStorage.setItem('meetup_key', JSON.stringify({key: key}));
    };

    api.getData = function(params){
        params.options['key'] = api.getKey();
        $.ajax({
            url: params.baseUrl + params.apiMethod,
            method: 'GET',
            dataType: 'jsonp',
            data: params.options,
            success: function(data){
                console.log(data.results);
            },
            error: function(err){
                console.log(err);
            }
        });
    };

    return api;
})();


document.addEventListener("DOMContentLoaded", function () {

    var mu_open_modal_button = document.getElementById('mu-open-key-modal');
    mu_open_modal_button.addEventListener('click', function (e) {
        var $modal = $('#mu-key-modal').modal({keyboard: true, show: true});
        document.getElementById('mu-key-input').value = MU.checkKey ? MU.getKey() : '';
    });

    mu_open_modal_button.innerHTML = MU.checkKey() ? 'Reset Meetup API Key' : 'Add Meetup API Key';

    document.getElementById('mu-save-key-button').addEventListener('click', function (e) {
        MU.setKey(document.getElementById('mu-key-input').value);
        $('#mu-key-modal').modal('hide');
    })
});
