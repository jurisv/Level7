Ext.define('Starter.model.Simpson', {
    extend: 'Starter.model.Base',

    fields: [
        'id',
        'name',
        'email',
        
        //Edge cases, as example, not used in demo
        //{name:'atHeight', mapping: '@height'}, //not used in example as this is invalid column name
        //{name:'hair_color', mapping: 'Hair.color'}, // same as above
        
        {name: 'phone', type: 'phonenumber'} // validation from this field will be included automatically
    ],

    proxy: {
        //Atlas. Notice the placeholder {0}. It is used to dynamicially insert 'rx' or other string specified
        //url: 'member/benefit/{0}/getmembercoveragehistory' 
        url: '/simpsons' //Specify endpoint here
    },

    validators: {
       name: {type: 'length', min: 3},
       email: {type: 'email'}
    }
});
