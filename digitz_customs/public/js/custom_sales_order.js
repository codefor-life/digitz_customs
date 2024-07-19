
frappe.ui.form.on("Sales Order",{
    refresh: function(frm){
        if(!frm.is_new()){
            frm.add_custom_button(__('Create Project'), function() {
                frappe.call({
                    method: "digitz_customs.digitz_customs.doctype.project.project.create_project_via_sales_order",
                    args: {
                        sales_order_id: frm.doc.name,
                    },
                    callback: function(response){
                        if(response.message){
                             // Store the data in localStorage to pass it to the new Sales Order form
                             localStorage.setItem('project_data', JSON.stringify(response.message));
                             console.log("done")
                             // Redirect to the new Quotation form
                             frappe.set_route('Form', 'Project', 'new-project-flzdltgprq')
                        }
                    }
                })
            });
        }
    },
    make_taxes_and_totals(frm){
        update_total_big_display_1(frm);

    },
    setup: function(frm){
        let data = localStorage.getItem('sales_order_data');
			frm.trigger("get_default_company_and_warehouse").then(()=>{
	
				if (data) {
					data = JSON.parse(data);
					data = data[0]
					console.log("sales_order_data",data)
					// Set the fields with the retrieved data
					frm.set_value('customer', data.customer);

					data["items"].forEach(item => {
						let row = frm.add_child('items');

						for(let key in item){
							row[key] = item[key]
						}
				    });
                    data["custom_item_table"].forEach(item =>{
                        let row = frm.add_child('custom_item_table');

						for(let key in item){
							row[key] = item[key]
						}
                    })
				frm.refresh_field('items');
                frm.refresh_field('custom_item_table');
				// Call other_fields_orcustom function
				// frappe.ui.form.trigger('Quotation', 'rate_includes_tax', frm);
				frm.trigger("make_taxes_and_totals");
				// Refresh the field to show the added rows
				frm.refresh_field('items');
                frm.refresh_field('custom_item_table');

				// Clear the data from localStorage
				localStorage.removeItem('sales_order_data');
				console.log("removed data",localStorage.getItem('sales_order_data'))
			}
		})
    },
    
})


function update_total_big_display_1(frm) {

	// let netTotal = isNaN(frm.doc.net_total) ? 0 : parseFloat(frm.doc.net_total).toFixed(2);
	let netTotal=0;
	frm.doc.custom_item_table.forEach((e)=>{
			netTotal+= e.amount;
	})

    // Add 'AED' prefix and format net_total for display

	let displayHtml = `<div style="font-size: 25px; text-align: right; color: black;">AED ${netTotal}</div>`;


    // Directly update the HTML content of the 'total_big' field
	frm.fields_dict['custom_amount'].$wrapper.html(displayHtml);

}