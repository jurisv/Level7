Ext.define('Starter.model.Simpson', {
    extend: 'Starter.model.Base',

    fields: [
        'id',
        'name',
        'email',

        //Edge cases
        {name:'atHeight', mapping: '@height'}, //not used in example as this is invalid column name
        {name:'hair_color', mapping: 'Hair.color'}, // same as above

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
