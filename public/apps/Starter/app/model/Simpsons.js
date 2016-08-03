Ext.define('Starter.model.Simpsons', {
    extend: 'Starter.model.Base',

    fields: ['name', 'email', 'phone'],

    proxy: {
        url: '/simpsons' //Specify endpoint here
    },

    validators:[

    ]

});
