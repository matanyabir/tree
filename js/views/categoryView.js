const CategoryView = Backbone.View.extend({
	className: 'category',

	ITEM_HEIGHT: 20,

	initialize: function ()
	{
		this.$name = $('<span class="name"></span>');
		this.$nameInput = $('<input class="name" />').hide();
		this.$items = $('<ul class="items"></ul>');
		this.$expandCollapse = $('<div class="expand-collapse"><svg class="icon dropdown"><use href="svgs/sprite/sprite.svg#icon-dropdown" /></svg></div>');
		this.$addBtn = $('<span class="action add-btn"><svg class="icon plus"><use href="svgs/sprite/sprite.svg#icon-plus" /></svg></span>');
		this.$delBtn = $('<span class="action del-btn"><svg class="icon delete"><use href="svgs/sprite/sprite.svg#icon-delete" /></svg></span>');
		this.$lockBtn = $('<span class="action lock-btn"><svg class="icon lock"><use href="svgs/sprite/sprite.svg#icon-lock" /></svg></span>');
		this.$unlockBtn = $('<span class="action unlock-btn"><svg class="icon open"><use href="svgs/sprite/sprite.svg#icon-open" /></svg></span>');
		this.$rowContainer = $('<div class="row"></div>')
			.append(this.$name)
			.append(this.$nameInput)
			.append(this.$addBtn)
			.append(this.$delBtn)
			.append(this.$lockBtn)
			.append(this.$unlockBtn);
		this.$el.html(this.$rowContainer)
			.append('<div class="v-line"></div>')
			.append('<div class="h-line"></div>')
			.append(this.$items)
			.append(this.$expandCollapse);
		this.bindEvents();

		return this;
	},

	bindEvents: function ()
	{
		this.$addBtn.click(this.addClick.bind(this));
		this.$delBtn.click(this.delClick.bind(this));
		this.$lockBtn.click((e)=> this.lockClick(e.shiftKey));
		this.$unlockBtn.click((e)=> this.unlockClick(e.shiftKey));
		this.$expandCollapse.click( (e)=> this.expandClick(e.shiftKey));
		this.$name.click(this.startEditName.bind(this));
		this.$nameInput.blur(this.finishEditName.bind(this));

		this.model.on('change:isCollapse', this.renderHeight, this);
		this.model.on('change:lock', this.renderLock, this);
		this.listenTo(this.model, 'destroy', this.remove);
		const items = this.model.get('items');
		this.listenTo(items, 'add', this.onAdd);
		this.listenTo(items, 'remove', this.onLengthChange);
	},
	expandClick: function (isShift)
	{
		this.model.expandCollapse(!this.model.get('isCollapse'), isShift);
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
	lockClick: function (isShift)
	{
		this.model.lock(true, isShift);
	},
	unlockClick: function (isShift)
	{
		this.model.lock(false, isShift);
	},

	startEditName: function ()
	{
		const name = this.model.get('name');
		this.$name.hide();
		this.$nameInput.show().val(name).focus();
	},

	finishEditName: function ()
	{
		// NOTE: we don't allow empty name, so we use default name in this case:
		const name = this.$nameInput.hide().val() || DEFAULT_CATEGORY_NAME;
		this.$name.show().text(name);
		this.model.set({name});
	},

	render: function ()
	{
		const name = this.model.get('name');
		this.$name.text(name);
		this.renderItems();
		this.renderLock();
		return this;
	},

	renderItems: function ()
	{
		const items = this.model.get('items');
		items.each((model)=> this.addOne(model));
		this.onLengthChange();
	},

	onLengthChange: function ()
	{
		const items = this.model.get('items');
		if (items.length) {
			this.$expandCollapse.show();
		} else {
			this.$expandCollapse.hide();
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
		// console.log('renderHeight', count);
		const height = (this.ITEM_HEIGHT * count) + 'px;';
		this.$el.css({height});
		// this.$el.css('height', height);
		if (this.model.get('isCollapse')) {
			this.$el.addClass('collapsed');
		} else {
			this.$el.removeClass('collapsed');
		}
	},

	/* change the lock-state
	 */
	renderLock: function ()
	{
		console.log('renderLock', this.model.get('lock'));
		if (this.model.get('lock')) {
			this.$rowContainer.addClass('locked');
		} else {
			this.$rowContainer.removeClass('locked');
		}
	}

});
