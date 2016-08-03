Ext.define('Starter.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Starter.model.Simpsons'
    ],
    alias: 'viewmodel.main',

    data: {
        title: 'Serverside CRUD'
    },

    stores: {
        simpsons: {
            model: 'Starter.model.Simpsons'
        }
    },

    formulas: {
        enableFilterBt: function(get) {
            return !(get('search.value').length > 2); //At least 3 characters
        }
    }
});
