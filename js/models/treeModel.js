/**
 * TreeModel - the categories-tree and its status.
 *
 * @author Matanya
 */
const TreeModel = Backbone.Model.extend(
{
	// default values
	defaults:
	{
		tree: new CategoryModel({}) // the root
		,dataStatus: DATA_STATUS.NO_DATA // the status of the data in the "data" array
	}

	/**
	* get all the data from the service.
	*/
	,loadData: function ()
	{
		this.set({dataStatus: DATA_STATUS.LOADING});
		Service.getData((data)=> {
			// const isRoot = true;
			const tree = new CategoryModel({});
			if (data.tree) {
				tree.buildFromJson(data.tree);
			}
			this.set({
				dataStatus: data.tree ? DATA_STATUS.GET_SUCCESS : DATA_STATUS.NO_DATA,
				tree
			});
		}, ()=> {
			this.set({
				dataStatus: DATA_STATUS.FAIL,
				tree: new CategoryModel({})
			});
		});
	}

	/**
	* save all the data to the service.
	*/
	,saveData: function ()
	{
		this.set({dataStatus: DATA_STATUS.LOADING});
		const data = this.get('tree').getJson();
		Service.setData(data, ()=> {
			this.set({
				dataStatus: DATA_STATUS.SAVE_SUCCESS
			});
		}, ()=> {
			this.set({
				dataStatus: DATA_STATUS.FAIL
			});
		});
	}

});
