// Copyright (c) 2024,   and contributors
// For license information, please see license.txt

frappe.ui.form.on("Proforma Invoice", {
	refresh(frm) {
        prev_project_name = localStorage.getItem('prev_project_name')
        prev_stage_name = localStorage.getItem('prev_stage_name')
        customer_name = localStorage.getItem('customer_name')
		percentage_of_completion = localStorage.getItem('percentage_of_completion')

        
        if(prev_project_name && prev_stage_name && customer_name){
            console.log("Proforma Invoice Entry With Custom Data.")
            frm.set_value('project', prev_project_name);
            frm.set_value('project_stage', prev_stage_name);
            frm.set_value('customer',customer_name)
			frm.set_value('percentage_of_completion',percentage_of_completion)
        }
        localStorage.removeItem('prev_project_name');
        localStorage.removeItem('prev_stage_name');
        localStorage.removeItem('customer_name')
		localStorage.removeItem('percentage_of_completion');




        if(!frm.is_new()){
            frm.add_custom_button(__('Create Sales Invoice'), function() {
                // frappe.call({
                //     method: "digitz_customs.digitz_customs.whitelist_methods.sales_order.create_sales_order",
                //     args: {
                //         quotation_id: frm.doc.name,
                //     },
                //     callback: function(response){ 
                //         if(response.message){
                //              // Store the data in localStorage to pass it to the new Sales Order form
                //              localStorage.setItem('sales_order_data', JSON.stringify(response.message));
                //              console.log("done")
                //              // Redirect to the new Quotation form
                //              frappe.set_route('Form', 'Sales Order', 'new-sales-order-mqkhkpotmg')
                //         }
                //     }
                // })
                frappe.set_route("Form","Sales Invoice","new-sales-invoice-tzqymbxqvm")
            });
        }

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
    
});

