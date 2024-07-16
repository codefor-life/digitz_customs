// Copyright (c) 2024,   and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Project Stages", {
// 	refresh(frm) {

// 	},
// });
console.log("workisdafang")

frappe.ui.form.on("Project Stages", {
    refresh(frm){
        console.log("working")
        create_button(frm);
        if(!frm.is_new()){
            frm.add_custom_button(__('Create New Sales Invoice'), function() {
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
                frappe.set_route('Form', 'Sales Invoice', 'new-sales-invoice-mqkhkpotmg')

            });
        }
    }
});


let create_button = function(frm){
    
}