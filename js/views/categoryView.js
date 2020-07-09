const CategoryView = Backbone.View.extend({
	className: 'category',

	ITEM_HEIGHT: 20,

	// events: {
	// 	"click .expand-collapse" : "expandClick"
	// 	,"click .add-btn" : "addClick"
	// },

	expandClick: function ()
	{
		console.log('click');
		this.model.expandCollapse(!this.model.get('isCollapse'));
	},

	addClick: function ()
	{
		const items = new ItemsCollection;
		this.model.get('items').add({items});
	},

	delClick: function ()
	{
		this.model.destroy();
	},

	initialize: function ()
	{
		this.$name = $('<span class="name"></span>');
		this.$items = $('<ul class="items"></ul>');
		this.$expandCollapse = $('<div class="expand-collapse"></div>');
		this.$addBtn = $('<span class="add-btn"></span>');
		this.$delBtn = $('<span class="del-btn"></span>');
		this.$el.html(this.$name)
			.append('<div class="v-line"></div>')
			.append(this.$addBtn)
			.append(this.$delBtn)
			.append(this.$items)
			.append(this.$expandCollapse)
			.append('<div class="h-line"></div>');
		this.$addBtn.click(this.addClick.bind(this));
		this.$delBtn.click(this.delClick.bind(this));
		this.$expandCollapse.click(this.expandClick.bind(this));
		// this.model.on('change:items', this.renderItems, this);
		this.model.on('change:isCollapse', this.renderHeight, this);
		this.listenTo(this.model, 'destroy', this.remove);
		const items = this.model.get('items');
		this.listenTo(items, 'add', this.onAdd);
		this.listenTo(items, 'remove', this.onLengthChange);
		// items.on('change:length', this.onLengthChange, this);
		// this.listenTo(items, 'reset', this.addAll);
		// this.listenTo(items, 'all', this.render);

		return this;
	},

	render: function ()
	{
		const name = this.model.get('name');
		this.$name.html(name);
		this.renderItems();
		return this;
	},

	renderItems: function ()
	{
		const items = this.model.get('items');
		console.log('renderItems', items.length);
		// this.$items.html('');
		items.each((model)=> this.addOne(model));
		this.onLengthChange();
	},

	onLengthChange: function ()
	{
		console.log('onLengthChange');
		const items = this.model.get('items');
		if (items.length) {
			this.$expandCollapse.show();
			// this.$expandCollapse.removeClass('hidden');
		} else {
			this.$expandCollapse.hide();
			// this.$expandCollapse.addClass('hidden');
		}
		this.renderHeight();
	},

	onAdd: function (model)
	{
		this.addOne(model);
		this.onLengthChange();
	},

	addOne: function (model)
	{
		const items = this.model.get('items');
		const categoryView = new CategoryView({model});
		this.$items.append(categoryView.render().$el);
	},

	/* calc the height of the category, depends on items count and isCollapse state (we
	 * need to calc it (instead of "auto") because we want animation...
	 */
	renderHeight: function ()
	{
		let count = 1;
		if (!this.model.get('isCollapse')) {
			count += this.model.get('items').length;
		}
		console.log('renderHeight', count);
		const height = (this.ITEM_HEIGHT * count) + 'px;';
		this.$el.css({height});
		// this.$el.css('height', height);
		if (this.model.get('isCollapse')) {
			this.$el.addClass('aaa');
		} else {
			this.$el.removeClass('aaa');
		}
	}

});
