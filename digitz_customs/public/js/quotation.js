frappe.ui.form.on("Quotation", {
    refresh: function(frm){
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
        }
    }
})