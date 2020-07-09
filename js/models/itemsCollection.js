/**
 * ItemsCollection - the collection of CategoryModel items, can be inside "father" CategoryModel at every level
 *
 * @author Matanya
 */
const ItemsCollection = Backbone.Collection.extend(
{
	model: CategoryModel

	// ,nextOrder: function() {
	// 	if (!this.length) return 1;
	// 	return this.last().get('order') + 1;
	// }
	//
	// ,comparator: 'order'
});
