// the "get data" status enum
const DATA_STATUS = {
	NO_DATA: 0
	,LOADING: 1
	,FAIL: 2
	,GET_SUCCESS: 3
	,SAVE_SUCCESS: 4
};

const DEFAULT_CATEGORY_NAME = "Category";

const EXAMPLE_TREE = {
	name: "Root",
	items: [
		{
			name: "Locked Category 1",
			lock: true
		},
		{
			name: "Category 2",
			items: [
				{
					name: "Cat2-1",
					isCollapse: true,
					items: [
						{
							name: "Itsik Bitsik"
						}]
				},
				{
					name: "Cat2-2"
				}]
		},
		{
			name: "Cat3 - Empty"
		},
		{
			name: "Category 4",
			items: [
				{
					name: "Monsters",
					lock: true,
					items: [
						{
							name: "Mike Wazowski",
							lock: true
						},{
							name: "James P. Sullivan"
						}]
				},
				{
					name: "Cars",
					lock: true,
					isCollapse: true,
					items: [
						{
							name: "Lightning McQueen"
						},{
							name: "Doc Hudson"
						},{
							name: "Mater"
						}]
				}]
		},
	]
};
