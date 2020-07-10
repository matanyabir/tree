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
		items: null // ItemsCollection, the children, collection of CategoryModel
		,name: DEFAULT_CATEGORY_NAME // the category name
		,isCollapse: false // the expand/collapse state
		,lock: false // the lock state
		// ,isRoot: false // are we the root of the tree
	}

	// ,initialize: function () {
	// 	const items = new ItemsCollection;
	// 	this.set({items});
	// }
	/**
	 * recursively init all the items from JSON
	 * @param data: the {items, name, isCollapse, lock} JSON
	*/
	,buildFromJson: function (data)
	{
		const {isCollapse, name, lock} = data;
		const items = new ItemsCollection;
		data.items.forEach((item)=> {
			const categoryModel = new CategoryModel({});
			categoryModel.buildFromJson(item);
			items.add(categoryModel);
		});
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

	// /**
	// * add a new item to the items list
	// */
	// ,addItem: function ()
	// {
	// 	const items = this.get('items').concat(new CategoryModel({}));
	// 	console.log('addItem', items.length - 1);
	// 	this.set('items', items);
	// }

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
