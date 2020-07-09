$(document).ready(function ()
{
	const model = new TreeModel({});
	const panelView = new PanelView({model: model});
	const treeView = new TreeView({model: model});
	$('#panel-container').html(panelView.render().$el);
	$('#tree-container').html(treeView.render().$el);
	model.loadData();
});
