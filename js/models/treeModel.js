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
		tree: null // new CategoryModel({}) // CategoryModel, the root
		,dataStatus: DATA_STATUS.NO_DATA // the status of the data in the "data" array
	}

	/**
	* get all the data from the service.
	*/
	,loadData: function ()
	{
		this.set({dataStatus: DATA_STATUS.LOADING});
		Service.getData((data)=> {
			if (data.tree) {
				const tree = new CategoryModel({});
				tree.buildFromJson(data.tree);
				this.set({
					dataStatus: DATA_STATUS.GET_SUCCESS,
					tree
				});
			}
			else {
				this.set({
					dataStatus: DATA_STATUS.NO_DATA,
					tree: this._getEmptyTree()
				});
			}
		}, ()=> {
			this.set({
				dataStatus: DATA_STATUS.FAIL,
				tree: this._getEmptyTree()
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

	/**
	* create a new empty tree, e.g.: if no data
	* @return tree - the root CategoryModel
	*/
	,_getEmptyTree: function ()
	{
		const tree = new CategoryModel({});
		tree.buildFromJson({items: [], name: DEFAULT_CATEGORY_NAME});
		return tree;
	}

});
