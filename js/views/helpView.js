const HelpView = Backbone.View.extend(
{
	className: 'help',

	events: {
		"click .toggle-help": "toggleHelpClick"
  	},

	render: function ()
	{
		this.$el.html('<div class="toggle-help"><svg class="icon toggle"><use href="svgs/sprite/sprite.svg#icon-dropdown" /></svg>Help</div>\
		<div class="help-content">\
		<p><span class="bold">Refresh</span> and <span class="bold">Save</span> buttons are for load/save to the server.<hr>\
		 <span class="add-btn"><svg class="icon plus"><use href="svgs/sprite/sprite.svg#icon-plus" /></svg></span> is \
		 for add a new sub category.<hr> \
		 <span class="lock-btn"><svg class="icon lock"><use href="svgs/sprite/sprite.svg#icon-lock" /></svg></span> , \
		 <span class="unlock-btn"><svg class="icon open"><use href="svgs/sprite/sprite.svg#icon-open" /></svg></span> is \
		 for lock or unlock the current category. You can\'t delete or edit name of locked item.\
		 <span class="bold">Note:</span> If you hold the "Shift" key, this action is recursive. <hr> \
		 To <span class="bold">edit</span> item name - just click on the name (unless the item is locked...<hr>\
		 <div class="expand-collapse"><svg class="icon dropdown"><use href="svgs/sprite/sprite.svg#icon-dropdown" /></svg></div> is\
		 for expand or collapse item.\
		 <span class="bold">Note:</span> If you hold the "Shift" key, this action is recursive.<hr>\
		 <span class="del-btn"><svg class="icon delete"><use href="svgs/sprite/sprite.svg#icon-delete" /></svg></span> is\
			for delete current item and all its descendants. \
		</p>\
		</div>'
		);
		return this;
	},

	toggleHelpClick: function ()
	{
		this.$el.toggleClass('expand');
	}

});
