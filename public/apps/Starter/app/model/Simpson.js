Ext.define('Starter.model.Simpson', {
    extend: 'Starter.model.Base',

    fields: [
        'id',
        'name',
        'email',
        {name: 'phone', type: 'phonenumber'} // validation from this field will be included automatically
    ],

    proxy: {
        url: '/simpsons' //Specify endpoint here
    },

    validators: {
       name: {type: 'length', min: 3},
       email: {type: 'email'}
    }
});
