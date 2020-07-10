/**
 * This module is responsible for get the data from the service
 */
const Service = (function()
{
	const me = {};

	const id = 'myId';

	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: "AIzaSyD_kV5QT1bQPDOH0z-TE8nxfa4_7VRAZOI",
		authDomain: "matanya-wix.firebaseapp.com",
		databaseURL: "https://matanya-wix.firebaseio.com",
		projectId: "matanya-wix",
		storageBucket: "matanya-wix.appspot.com",
		messagingSenderId: "603585070083",
		appId: "1:603585070083:web:accd45d352a75213df7a36",
		measurementId: "G-ND819P4FN7"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();

	/**
	 * get the data from the service
	 *
	 * @param {function} cbSuccess - the callback that should be call with the data
	 * @param {function} cbFail - the callback that should be call in case of fail
	 * @author Matanya
	 */
	me.getData = function(cbSuccess, cbFail)
	{
		try {
			firebase.database().ref('/trees/' + id).once('value').then(function (snapshot) {
				const val = snapshot.val();
				console.log('gat data', val);
				cbSuccess(val || {});
				// const tree = val && val.tree;
			});
		} catch(err) {
			cbFail()
		}
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
		try {
			firebase.database().ref('trees/' + id).set({
				tree
			}, function(error) {
				console.log('set done', error);
				if (error) {
					// The write failed...
					cbFail();
				} else {
					// Data saved successfully!
					cbSuccess();
				}
			});
		} catch(err) {
			cbFail()
		}
	};


	return me;
})();
