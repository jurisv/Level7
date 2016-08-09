Ext.define('Starter.model.Base', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.identifier.Uuid',
        'Starter.ux.data.proxy.Level7',

        // Require validators and custom fields here
        'Starter.model.field.PhoneNumber',
        'Ext.data.validator.Length',
        'Ext.data.validator.Email'
    ],

    idProperty: 'id', // defaults to id, added for clarity
    identifier: 'uuid', // uuid, sequential or negative

    schema: {
        namespace: 'Starter.model',
        proxy: {
            type: 'level7',
            reader: {
                type: 'json',
                useSimpleAccessors: true, // Workaround for field names containing dots
                rootProperty: 'data',
                totalProperty: 'total',
                successProperty: 'success',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                nameProperty: 'mapping', //send back mapped properties rather than named
                //This server-side example relies on all fields
                writeAllFields: true // TBD [All | modified]
            }
        }
    },

    constructor: function (config) {
        var me = this;

        me.callParent(arguments);

        //Assemble url using url property from model. Schema is used to decorate the proxy definition on Model
        //We have to ensure that correct url is specified, rather than class name
        //<debug>
        if (me.proxy.type === 'level7' && (me.proxy.url.indexOf(me.$className) > -1)) {
            console.warn('Models using Level7 proxy should be configured with an endpoint URL.');
        }
        //</debug>
    }
});
