$(document).ready(function ()
{
	const model = new TreeModel({});
	const helpView = new HelpView({});
	const panelView = new PanelView({model: model});
	const treeView = new TreeView({model: model});
	$('#help-container').html(helpView.render().$el);
	$('#panel-container').html(panelView.render().$el);
	$('#tree-container').html(treeView.render().$el);
	model.loadData();
});
