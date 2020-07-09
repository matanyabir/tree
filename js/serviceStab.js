/**
 * Stab class for debugging...
 */
const Service = (function()
{
	const me = {};

	/**
	 * get the data from the service
	 *
	 * @param {function} cbSuccess - the callback that should be call with the data
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.getData = function(cbSuccess, cbFail)
	{
		setTimeout(function(){
			cbSuccess(_data);
		}, Math.random()*1000);
	};

	/**
	 * set the data to the service
	 *
	 * @param {object} tree - the json that represent the tree
	 * @param {function} cbSuccess - the callback that should be call in case of success
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.setData = function(tree, cbSuccess, cbFail)
	{
		setTimeout(function(){
			_data.tree = tree;
			cbSuccess();
		}, Math.random()*1000);
	};

	const _data = {
		tree: {
			name: "Root",
			items: [
				{
					name: "Cat1",
					items: []
				},
				{
					name: "Cat2",
					items: [
						{
							name: "Cat2-1",
							items: [
								{
									name: "Itsik Bitsik",
									items: []
								}]
						},
						{
							name: "Cat2-2",
							items: []
						}]
				},
				{
					name: "Cat3",
					items: []
				},
			]
		}
	};

	return me;
})();
