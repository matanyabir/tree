/**
 * ItemsCollection - the collection of CategoryModel items, can be inside "father" CategoryModel at every level
 *
 * @author Matanya
 */
const ItemsCollection = Backbone.Collection.extend(
{
	model: CategoryModel

});
