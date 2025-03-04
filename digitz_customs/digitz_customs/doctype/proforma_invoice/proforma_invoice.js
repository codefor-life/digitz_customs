// Copyright (c) 2024,   and contributors
// For license information, please see license.txt

frappe.ui.form.on("Proforma Invoice", {
	refresh(frm) {
		
		let displayHtml = `<div style="font-size: 25px; text-align: right; color: black;">AED ${frm.doc.net_total}</div>`;
		frm.fields_dict['total_big'].$wrapper.html(displayHtml);

		localStorage.removeItem('prev_project_name');
        localStorage.removeItem('prev_stage_name');
        localStorage.removeItem('customer_name');
		localStorage.removeItem('percentage_of_completion');
		localStorage.removeItem('project_stage_defination');
		localStorage.removeItem('project_amount');
        // if(!frm.is_new()){
        //     frm.add_custom_button(__('Create Progressive Invoice'), function() {
        //         // frappe.call({
        //         //     method: "digitz_customs.digitz_customs.whitelist_methods.sales_order.create_sales_order",
        //         //     args: {
        //         //         quotation_id: frm.doc.name,
        //         //     },
        //         //     callback: function(response){ 
        //         //         ifupdate_total_big_display_1(frm);(response.message){
        //         //              // Store the data in localStorage to pass it to the new Sales Order form
        //         //              localStorage.setItem('sales_order_data', JSON.stringify(response.message));
        //         //              console.log("done")
        //         //              // Redirect to the new Quotation form
        //         //              frappe.set_route('Form', 'Sales Order', 'new-sales-order-mqkhkpotmg')
        //         //         }
        //         //     }
        //         // })

        //         // frappe.set_route("Form","Sales Invoice","new-sales-invoice-tzqymbxqvm")
        //     });
        // }
		// frm.set_df_property('custom_item_table', 'hidden', 0);
	},
	setup(frm){
			if(!frm.doc.project_stage){
				let prev_project_name = localStorage.getItem('prev_project_name')
				let prev_stage_name = localStorage.getItem('prev_stage_name')
				let customer_name = localStorage.getItem('customer_name')
				let percentage_of_completion = localStorage.getItem('percentage_of_completion')
				let sales_order_id = localStorage.getItem('sales_order_id')
				let project_stage_defination = localStorage.getItem('project_stage_defination')
				let project_amount = localStorage.getItem('project_amount')
        
				if(localStorage.getItem("prev_stage_name") && localStorage.getItem("percentage_of_completion") && customer_name){
					console.log("Proforma Invoice Entry With Custom Data.")
					frm.set_value('project', prev_project_name);
					frm.set_value('project_stage', prev_stage_name);
					frm.set_value('customer',customer_name)
					frm.set_value('percentage_of_completion',percentage_of_completion)

					frm.set_df_property('items', 'hidden', 1);
					frm.set_df_property('custom_item_table', 'hidden', 0);
					frm.add_child("item_table",{
						"item": project_stage_defination,
						"description": project_stage_defination,
						"completed_percentage": percentage_of_completion,
						"quantity": 1,
						"unit": "Nos",
						"rate": (project_amount * percentage_of_completion) / 100,
						"amount": (project_amount * percentage_of_completion) / 100,
					})
			
					update_total_big_display_1(frm);
			
			}
        }
        localStorage.removeItem('prev_project_name');
        localStorage.removeItem('prev_stage_name');
        localStorage.removeItem('customer_name');
		localStorage.removeItem('percentage_of_completion');
		localStorage.removeItem('project_stage_defination');
		localStorage.removeItem('project_amount');
		
		// console.log("sales order id",sales_order_id)
		// if(sales_order_id){
		// 	frappe.call({
		// 		method:"digitz_customs.digitz_customs.whitelist_methods.sales_order.get_sales_order",
		// 		args:{
		// 			sales_order_id:sales_order_id
		// 		},
		// 		callback: function(response){
		// 			if(response.message){
		// 				let data = response.message;
		// 				console.log("saleso",data);

		// 				data.custom_item_table.forEach(item =>{
        //                     console.log('Hello',item)
        //                     let row = frm.add_child("item_table",{
        //                         "item_name": item.item_name,
        //                         "description": item.description,
        //                         "qty":item.qty,
        //                         "rate": item.amount,
        //                         "amount": item.amount
        //                     })
        //                 })
        //                 frm.refresh_field('item_table');
		// 				frm.set_value("net_total",data.custom_net_total_copy);

		// 				let displayHtml = `<div style="font-size: 25px; text-align: right; color: black;">AED ${data.custom_net_total_copy}</div>`;


		// 				// Directly update the HTML content of the 'total_big' field
		// 				frm.set_value("total_big",displayHtml)
		// 				frm.fields_dict['total_big'].$wrapper.html(displayHtml);
		// 			}
		// 		}
		// 	})
		// }
		

	},
    onload(frm){
        frm.trigger("assign_defaults")
    },
    assign_defaults(frm)
	{
		if(frm.is_new())
		{
			frm.trigger("get_default_company_and_warehouse");
        }
    },
    get_default_company_and_warehouse(frm) {
		var default_company = ""
		console.log("From Get Default Warehouse Method in the parent form")

		frappe.call({
			method: 'frappe.client.get_value',
			args: {
				'doctype': 'Global Settings',
				'fieldname': 'default_company'
			},
			callback: (r) => {

				default_company = r.message.default_company
				frm.doc.company = r.message.default_company
				frm.refresh_field("company");
				frappe.call(
					{
						method: 'frappe.client.get_value',
						args: {
							'doctype': 'Company',
							'filters': { 'company_name': default_company },
							'fieldname': ['default_warehouse', 'rate_includes_tax']
						},
						callback: (r2) => {
							console.log("Before assign default warehouse");
							console.log(r2.message.default_warehouse);
							frm.doc.warehouse = r2.message.default_warehouse;
							console.log(frm.doc.warehouse);
							frm.doc.rate_includes_tax = r2.message.rate_includes_tax;
							frm.refresh_field("warehouse");
							frm.refresh_field("rate_includes_tax");
						}
					}

				)
			}
		})

	},
	item_table(frm){
		update_total_big_display_1(frm);
	}
    
});


function update_total_big_display_1(frm) {

	// let netTotal = isNaN(frm.doc.net_total) ? 0 : parseFloat(frm.doc.net_total).toFixed(2);
	let netTotal=0;
	frm.doc.item_table.forEach((e)=>{
			netTotal+= e.amount;
	})

    // Add 'AED' prefix and format net_total for display

	let displayHtml = `<div style="font-size: 25px; text-align: right; color: black;">AED ${netTotal}</div>`;

    frm.set_value("net_total",netTotal);
    // Directly update the HTML content of the 'total_big' field
	frm.fields_dict['total_big'].$wrapper.html(displayHtml);

}