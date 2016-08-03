Ext.define('Starter.model.Base', {
    extend: 'Ext.data.Model',
    requires: [
        'Starter.ux.data.proxy.Level7'
    ],

    schema: {
        proxy: {
            type: 'level7',
            reader: {
                type: 'json',
                rootProperty: 'data',
                totalProperty: 'total',
                successProperty: 'success',
                messageProperty: 'message'
            }
        }
    },

    constructor: function (config) {
        var me = this;

        me.callParent([config]);

        //Assemble url using url property from model. Schema is used to decorate the proxy definition on Model
        //We have to ensure that correct url is specified, rather than class name
        //<debug>
        if (me.proxy.type === 'level7' && (me.proxy.url.indexOf(me.$className) > -1)) {
            console.warn('Models using Level7 proxy should be configured with an endpoint URL.');
        }
        //</debug>
    }
});
