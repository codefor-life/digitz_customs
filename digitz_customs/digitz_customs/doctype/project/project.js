// Copyright (c) 2024,   and contributors
// For license information, please see license.txt

frappe.ui.form.on("Project", {
	refresh(frm) {
		localStorage.setItem("current_project",frm.doc.name)
		
		frm.set_query('advance_entry', () => {
			return {
				filters: {				
					'customer': frm.doc.customer,
					'custom_project': frm.doc.name,
					'custom_advance_payment': 1
				}
			}
		});
		frm.set_query('sales_order', () => {
			return {
				filters: {				
					'customer': frm.doc.customer,
					// 'custom_project': frm.doc.name,
				}
			}
		});
			$(frm.fields_dict.advance_entry.input).on("click", function(){
				var customer = localStorage.setItem('prev_customer',frm.doc.customer);
				var project = localStorage.setItem('prev_project',frm.doc.name);
			})
	}, 
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
        },
		onload: function(frm) {
			// Check if customer name exists in localStorage
			var customer = localStorage.getItem('customer');
	
			if (customer) {
				// Set the customer field with the retrieved customer name
				frm.set_value('customer', customer);
	
				// Clear the stored customer name from localStorage
				localStorage.removeItem('customer');

			}

			frm.fields_dict['stage'].grid.get_field('project_stage').get_query = function(doc, cdt, cdn) {
				var child = locals[cdt][cdn];
				return {
					filters: {
						'project': frm.doc.name1 // Change these filters as per your requirement
					}
				};
			};
			
		},
	// advance_entry(frm){
	// 	console.log("sdfjsldf  jk")
	// }
});


