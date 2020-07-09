/**
 * This module is responsible for get the data from the service
 */
var Service = (function()
{
	var me = {};

	/**
	 * get the data from the service
	 *
	 * @param {function} cbSuccess - the callback that should be call with the data
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.getData = function(cbSuccess, cbFail)
	{
		// Run the "server.js", so the "http://localhost:3000/" will return "http://ec2-52-18-187-100.eu-west-1.compute.amazonaws.com:2503/" without cross-domain stuff...
		$.get("http://localhost:3000/", function( data ) {
			cbSuccess( data );
		}).fail(function(){
			cbFail();
		});
	}

	return me;
})();
