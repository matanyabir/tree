const TreeView = Backbone.View.extend({
	className: 'tree',

	initialize: function ()
	{
		this.model.on('change:tree', this.render, this);
		return this;
	},

	render: function ()
	{
		console.log('aaa111');
		const categoryModel = this.model.get('tree');
		if (categoryModel)
		{
			const categoryView = new CategoryView({model: categoryModel});
			this.$el.html(categoryView.render().$el);
		}
		return this;
	}
});
