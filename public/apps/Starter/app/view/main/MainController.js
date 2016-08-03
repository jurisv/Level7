Ext.define('Starter.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onLoadClick: function () {
        this.reloadStore();
    },

    reloadStore: function (extraPrams) {
        var store = this.getViewModel().getStore('simpsons');

        //Specify any params you need here
        var params = Ext.apply({
            sessionId: 'f8ih214958yg2087',
            planet: 'earth'
        }, extraPrams);

        //set all extra params in the bulk manner
        store.getProxy().setExtraParams(params);

        //load store using configured proxy and params
        store.load();
    },

    onClearTrigger: function (trigger) {
        trigger.reset();

        this.reloadStore();
    },

    onStoreFilter: function () {
        var searchString = this.lookup('search').getValue();

        if (searchString){
            this.reloadStore({filter: searchString});
        }
    },

    onAdd: function () {

    },

    onEdit: function () {

    },

    onDelete: function () {

    }


});
