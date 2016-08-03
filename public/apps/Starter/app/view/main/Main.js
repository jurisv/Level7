Ext.define('Starter.view.main.Main', {
    extend: 'Ext.Viewport',
    xtype: 'app-main',

    requires: [
        'Ext.window.MessageBox'
    ],

    controller: 'main',
    viewModel: 'main',

    items: [
        {
            xtype: 'grid',

            //sizing, typically you would not specify sizes and let it size naturally according to parent
            width: 800,
            height: 500,
            reference: 'datatable',
            columns: [
                {text: 'Name', dataIndex: 'name'},
                {text: 'Email', dataIndex: 'email', flex: 1},
                {text: 'Phone', dataIndex: 'phone', width: 120}
            ],
            bind: {
                title: '{title}',
                store: '{simpsons}'
            },

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {

                            xtype: 'textfield',
                            reference: 'search',
                            publishes: ['value'], // ensure that this value is available in viewModel
                            triggers: {
                                clear: {
                                    cls: 'x-form-clear-trigger',
                                    weight: 1, // controls display order
                                    hidden: true,
                                    hideOnReadOnly: false, //always visible
                                    handler: 'onClearTrigger'
                                }
                            },
                            listeners: {
                                change: function (field, newValue) {
                                    var trigger = field.triggers.clear;
                                    if (newValue.length > 0) {
                                        trigger.show()
                                    } else {
                                        trigger.hide();
                                    }
                                }
                            },
                            emptyText: 'Filter'
                        },
                        {
                            xtype: 'button',
                            bind: {
                                disabled: '{enableFilterBt}'
                            },
                            text: 'Filter',
                            handler: 'onStoreFilter'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add new entry',
                            handler: 'onAdd'
                        },
                        {
                            text: 'Edit selected',
                            handler: 'onEdit'
                        },
                        {
                            text: 'Delete selected',
                            handler: 'onDelete'
                        },
                        '->',
                        {
                            text: 'Load data',
                            handler: 'onLoadClick'
                        }
                    ]
                }
            ]
        }
    ]
});
