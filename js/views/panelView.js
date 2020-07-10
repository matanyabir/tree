const PanelView = Backbone.View.extend(
{
	className: 'panel',

	events: {
		"click .refresh": "refreshClick",
		"click .save": "saveClick"
  	},

	initialize: function ()
	{
		this.$refreshButton = $('<span class="main-btn refresh">Refresh</span>');
		this.$saveButton = $('<span class="main-btn save">Save</span>');
		this.$status = $('<h5 class="status"></h5>');
		this.$el.html(this.$refreshButton)
			.append(this.$saveButton)
			.append(this.$status);
		this.model.on('change:dataStatus', this.render, this);
		return this;
	},

	render: function ()
	{
		this.$refreshButton.removeClass('disabled');
		this.$saveButton.removeClass('disabled');
		switch (this.model.get('dataStatus'))
		{
			case DATA_STATUS.FAIL:
				this.$status.text('Fail :( ');
				break;
			case DATA_STATUS.GET_SUCCESS:
				this.$status.text('Got the data at ' + this._getNowString());
				break;
			case DATA_STATUS.SAVE_SUCCESS:
				this.$status.text('Save the data at ' + this._getNowString());
				break;
			case DATA_STATUS.NO_DATA:
				this.$status.text('No data');
				break;
			case DATA_STATUS.LOADING:
				this.$refreshButton.addClass('disabled');
				this.$saveButton.addClass('disabled');
				this.$status.text('Loading...');
				break;
		}
		return this;
	},

	saveClick: function ()
	{
		this.model.saveData();
	},

	refreshClick: function ()
	{
		this.model.loadData();
	},

	/**
	 * get string-date for the current time.
	 * @return displayDatetime {string} e.g.: "9.7.2020 22:07:59"
	 * @private
	 */
	_getNowString: function() {
		const now = new Date();
		let hour = now.getHours();
		if (hour<10) {
			hour = '0' + hour;
		}
		let minutes = now.getMinutes();
		if (minutes<10) {
			minutes = '0' + minutes;
		}
		let seconds = now.getSeconds();
		if (seconds<10) {
			seconds = '0' + seconds;
		}
		return `${now.getDate()}.${1+now.getMonth()}.${now.getFullYear()} ${hour}:${minutes}:${seconds}`;
	}

});
