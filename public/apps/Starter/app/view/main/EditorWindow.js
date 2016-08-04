Ext.define('Starter.view.main.EditorWindow', {
    extend: 'Ext.window.Window',

    xtype:'main-editorwindow',

    bind: {
        title: '{title}'
    },

    layout: 'fit',

    ghost: false, //disable ghost so we can actually see window content while dragging
    modal: true,

    width: 500,

    closable: true,

    items: [
        {
            xtype: 'form',

            bodyPadding: 10,

            reference: 'editorForm',
            // use the Model's validations for displaying form errors
            modelValidation: true,

            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults: {
                xtype: 'textfield',
                msgTarget: 'side' // Wwe will show error indicator on the right side of the field
            },

            items: [
                {
                    fieldLabel: 'Name',
                    reference: 'name',
                    bind: '{simpsonRecord.name}'
                },
                {
                    fieldLabel: 'Email',
                    reference: 'email',
                    bind: '{simpsonRecord.email}'
                },
                {
                    fieldLabel: 'Phone',
                    reference: 'phone',
                    bind: '{simpsonRecord.phone}'
                }
            ]
        }
    ],

    buttons: [{
        text: 'Save',
        //Because we add this window to the parent, all methods defined in that view will be accessible
        handler: 'onSaveClick'
    }, {
        text: 'Cancel',
        handler: 'onCancelClick'
    }]
});
