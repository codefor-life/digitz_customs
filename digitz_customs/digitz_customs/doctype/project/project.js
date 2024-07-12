// Copyright (c) 2024,   and contributors
// For license information, please see license.txt

frappe.ui.form.on("Project", {
	// refresh(frm) {

	// }, 
    setup(frm) {
                let data = localStorage.getItem('project_data');	
				if (data) {
					data = JSON.parse(data);
					console.log("project_data",data)
					// Set the fields with the retrieved data
					frm.set_value('customer', data.customer);
                    frm.set_value('sales_order', data.sales_order);


				    frm.refresh_field();
	
				// Clear the data from localStorage
				localStorage.removeItem('project_data');
				console.log("removed data",localStorage.getItem('project_data'))
			}
        }
});


