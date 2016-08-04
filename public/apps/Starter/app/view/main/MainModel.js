Ext.define('Starter.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    requires: [
        'Starter.model.Simpson'
    ],

    data: {
        title: 'Serverside CRUD'
    },

    stores: {
        simpsons: {
            model: 'Simpson',
            session: true,
            autoLoad: true,
            remoteFilter: true, // by default filtering is local
            remoteSort: true // to illustrate remote sorting. by default sorting is local
        }
    },

    formulas: {
        enableFilterBt: function(get) {
            return !(get('search.value').length > 2); //At least 3 characters
        }
    }
});
