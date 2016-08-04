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
        //Note: If you would like to preserve any previous params, set them one by one.
        store.getProxy().setExtraParams(params);

        //load store using configured proxy and params
        store.load();
    },

    onClearTrigger: function (trigger) {
        trigger.reset();
        this.getViewModel().getStore('simpsons').clearFilter();
    },

    onStoreFilter: function () {
        var searchString = this.lookup('search').getValue(),
            store = this.getViewModel().getStore('simpsons');

        if (searchString) {
            //Simple filter by one field
            store.filter('name', searchString);
        }
    },

    createEditor: function (record) {
        var me = this,
            view = this.getView();

        me.isEditing = !!record;

        me.editor = view.add({
            xtype: 'main-editorwindow',
            // Creates a child session that will spawn from the current session
            // of this view.
            session: true,
            viewModel: {
                data: {
                    title: record ? 'Edit: ' + record.get('name') : 'Add New Simpson'
                },
                // If we are passed a record, a copy of it will be created in the newly spawned session.
                // Otherwise, create a new phantom customer in the child.
                links: {
                    simpsonRecord: record || {
                        type: 'Simpson',
                        create: true
                    }
                }
            }
        });

        me.editor.show();
    },

    onAdd: function () {
        this.createEditor(null);
    },

    onEdit: function () {
        var grid = this.lookup('simpsonsGrid'),
            record = grid.getSelectionModel().getSelection()[0];

        this.createEditor(record);
    },

    flushToServer: function () {
        this.getView().getSession().getSaveBatch().start();
    },

    onDelete: function () {
        var grid = this.lookup('simpsonsGrid'),
            record = grid.getSelectionModel().getSelection()[0];

        record.drop();
        this.flushToServer();
    },

    onSaveClick: function () {
        // Save the changes pending in the editor's child session back to the
        // parent session.
        var me = this,
            store = me.getViewModel().getStore('simpsons'),
            form = me.lookupReference('editorForm'),
            isEditing = me.isEditing,
            editor = me.editor,
            id;

        if (form.isValid()) {

            if (!isEditing) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = editor.getViewModel().get('simpsonRecord').id;
            }
            editor.getSession().save();

            if (!isEditing) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                store.add(me.getSession().getRecord('Simpson', id));
            }
            me.onCancelClick();

            //save changes record parent session
            this.flushToServer();
        }
    },

    onCancelClick: function () {
        this.editor = Ext.destroy(this.editor);
    }
});
