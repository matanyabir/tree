const TreeView = Backbone.View.extend({
	className: 'tree',

	initialize: function ()
	{
		this.model.on('change:dataStatus', this.render, this);
		return this;
	},

	render: function ()
	{
		if (this.model.get('dataStatus') === DATA_STATUS.GET_SUCCESS)
		{
			const categoryModel = this.model.get('tree');
			const categoryView = new CategoryView({model: categoryModel});
			this.$el.html(categoryView.render().$el);
		}
		return this;
	}
});
