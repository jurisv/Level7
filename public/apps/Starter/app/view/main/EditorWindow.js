Ext.define('Starter.view.main.EditorWindow', {
    extend: 'Ext.window.Window',

    controller: 'main',
    viewModel: 'main',

    layout: 'fit',
    modal: true,

    items: [
        {
            xtype: 'form',
            items: []
        }
    ]
});
