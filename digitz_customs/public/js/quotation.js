frappe.ui.form.on("Quotation", {
    refresh: function(frm){
        update_total_big_display_1(frm);


        if(!frm.is_new()){
            frm.add_custom_button(__('Create New Sales Order'), function() {
                frappe.call({
                    method: "digitz_customs.digitz_customs.whitelist_methods.sales_order.create_sales_order",
                    args: {
                        quotation_id: frm.doc.name,
                    },
                    callback: function(response){ 
                        if(response.message){
                             // Store the data in localStorage to pass it to the new Sales Order form
                             localStorage.setItem('sales_order_data', JSON.stringify(response.message));
                             console.log("done")
                             // Redirect to the new Quotation form
                             frappe.set_route('Form', 'Sales Order', 'new-sales-order-mqkhkpotmg')
                        }
                    }
                })
            });
            frm.add_custom_button(__('Create New Project'), function() {
                localStorage.setItem('customer', frm.doc.customer);
                frappe.set_route('Form', 'Project', 'new-project-mqkhkpotmg')
                // frappe.call({
                //     method: "digitz_customs.digitz_customs.whitelist_methods.sales_order.create_sales_order",
                //     args: {
                //         quotation_id: frm.doc.name,
                //     },
                //     callback: function(response){
                //         if(response.message){
                //              // Store the data in localStorage to pass it to the new Sales Order form
                //             //  localStorage.setItem('sales_order_data', JSON.stringify(response.message));
                //             //  console.log("done")
                //              // Redirect to the new Quotation form
                //         }
                //     }
                // })
            });
        }
    },
    make_taxes_and_totals(frm){
        update_total_big_display_1(frm);

    },
    
    onload: function(frm) {
        console.log("asdfhkjljsfhkjsk fjlksfh sdkjfhkj s")
        // Retrieve the data from localStorage
        let data = localStorage.getItem('quotation_data');
		frm.trigger("get_default_company_and_warehouse").then(()=>{

		console.log("localdata",data)
        if (data) {
            data = JSON.parse(data);

            // Set the fields with the retrieved data
            frm.set_value('customer', data.customer);
            data.items.forEach(item => {
                let row = frm.add_child('items', {
					warehouse: frm.doc.warehouse,
                    item: item.item,
                    qty: item.qty,
                    rate: item.rate
                });
            });

			data.new_item_table.forEach(item =>{
				console.log('Hello',item)
				let row = frm.add_child("custom_item_table",{
                    "item_name": data.item_name,
					"description": item.description,
					"qty":item.quantity,
					"rate": item.selling_sum,
					"amount": item.selling_sum
				})
			})

			frm.refresh_field('custom_item_table');

            frm.refresh_field('items');

			// Call other_fields_orcustom function
			// frappe.ui.form.trigger('Quotation', 'rate_includes_tax', frm);
			frm.trigger("make_taxes_and_totals");
            // Refresh the field to show the added rows
            frm.refresh_field('items');


            // Clear the data from localStorage
            localStorage.removeItem('quotation_data');
			console.log("removed data",localStorage.getItem('quotation_data'))
        }
	})
    }
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