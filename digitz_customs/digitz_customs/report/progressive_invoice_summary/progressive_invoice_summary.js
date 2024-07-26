// Copyright (c) 2024,   and contributors
// For license information, please see license.txt

frappe.query_reports["Progressive Invoice Summary"] = {
	"filters": [
		{
            "fieldname": "project",
            "label": "Project",
            "fieldtype": "Link",
            "options": "Project",
            "default": ""
        },
        // {
        //     "fieldname": "stage",
        //     "label": "Stage",
        //     "fieldtype": "Link",
        //     "options": "Stage Table",
        //     "default": ""
        // }
		{
			"fieldname": "item", 
			"label": "Item (Stage Table)", 
			"fieldtype": "Data", 
		},

	]
};
