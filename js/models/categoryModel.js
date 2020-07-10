/**
 * CategoryModel - the category node in the tree, can be in every level
 *
 * @author Matanya
 */
const CategoryModel = Backbone.Model.extend(
{
	// default values
	defaults:
	{
		items: null // ItemsCollection ( = collection of CategoryModel), the children
		,name: DEFAULT_CATEGORY_NAME // the category name
		,isCollapse: false // the expand/collapse state
		,lock: false // the lock state
	}

	/**
	 * recursively init all the items from JSON
	 * @param data: the {items, name, isCollapse, lock} JSON
	*/
	,buildFromJson: function (data)
	{
		const {isCollapse, name, lock} = data;
		const items = new ItemsCollection;
		if (data.items) {
			data.items.forEach((item) => {
				const categoryModel = new CategoryModel({});
				categoryModel.buildFromJson(item);
				items.add(categoryModel);
			});
		}
		this.set({isCollapse, name, items, lock});
		return this;
	}

	/**
	 * recursively get all the items JSON
	 * @return data: the {items, name, isCollapse, lock} JSON
	*/
	,getJson: function ()
	{
		const isCollapse = this.get('isCollapse') || false;
		const lock = this.get('lock') || false;
		const name = this.get('name');
		const collection = this.get('items');
		const items = [];
		collection.each((item)=> {
			items.push(item.getJson());
		});
		return {isCollapse, name, items, lock};
	}

	,expandCollapse: function (isCollapse, isRecursive)
	{
		this.set({isCollapse});
		if (isRecursive) {
			this.get('items').each( model => model.expandCollapse(isCollapse, true));
		}
	}

	,lock: function (lock, isRecursive)
	{
		this.set({lock});
		if (isRecursive) {
			this.get('items').each( model => model.lock(lock, true));
		}
	}

});
