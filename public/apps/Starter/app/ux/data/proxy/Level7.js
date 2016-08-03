Ext.define('Starter.ux.data.proxy.Level7', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.level7',

    // Keep a default copy of the action methods here. Ideally could just null
    // out actionMethods and just check if it exists & has a property, otherwise
    // fallback to the default. But at the moment it's defined as a public property,
    // so we need to be able to maintain the ability to modify/access it.
    actionMethods: {
        create: 'POST',
        read: 'POST',
        update: 'POST',
        destroy: 'POST'
    },

    /**
     * Get the url for the request taking into account the order of priority,
     * - The request
     * - The api
     * - The url
     * @private
     * @param {Ext.data.Request} request The request
     * @return {String} The url
     */
    getUrl: function (request) {
        return request ? request.getProxy().url + '/' + request.getAction() : this.callParent();
    }
});