
console.log("file is connected.");

frappe.ui.form.on("Sales Invoice",{
    refresh(frm){
        // frm.set_df_property('custom_item_table', 'hidden', 1);

        frm.add_custom_button(__('Allocate'), function() {
            // Define the dialog
            let d = new frappe.ui.Dialog({
                title: 'Allocate Receipt Entry',
                fields: [
                    {
                        label: 'Receipt Entry',
                        fieldname: 'receipt_entry',
                        fieldtype: 'Link',
                        options: 'Receipt Entry',
                        get_query: function() {
                            return {
                                filters: [
                                    ['custom_advance_payment', '=', 1],
                                    ['custom_project', '=', frm.doc.custom_project],
                                    ['custom_customer', '=', frm.doc.customer]
                                ]
                            };
                        }
                    }
                ],
                primary_action: function(data) {
                    console.log('Selected Receipt Entry:', data.receipt_entry);

                    frappe.call({
                        method: 'digitz_customs.digitz_customs.whitelist_methods.custom_receipt_entry.receipt_allocation',
                        args:{
                            receipt_entry_id: data.receipt_entry,
                            sales_inv_id: frm.doc.name
                        },
                        callback: function(response){
                            if(response.message){

                            }
                        }
                    })

                    d.hide();
                },
                primary_action_label: __('Allocate')
            });

            // Show the dialog
            d.show();
        });
    },
    make_taxes_and_totals(frm){
        update_total_big_display_1(frm);
    },
    setup(frm){
        let prev_customer = localStorage.getItem("prev_customer");
        let prev_project = localStorage.getItem("prev_project");
        let proforma_invoice = localStorage.getItem("proforma_invoice");
        console.log(prev_customer,prev_project)

        if(prev_customer && prev_project && proforma_invoice){
            frm.set_value("customer",prev_customer);
            console.log(2);
            frm.set_value("custom_project",prev_project);
            frm.set_value("custom_stage_proforma_invoice",proforma_invoice);
        }

        localStorage.removeItem("prev_customer");
        localStorage.removeItem("prev_project");
        localStorage.removeItem("proforma_invoice");


        if(proforma_invoice){
            frm.set_df_property('items', 'hidden', 1);
            frm.set_df_property('custom_item_table', 'hidden', 0);

            frappe.call({
                method:"digitz_customs.digitz_customs.whitelist_methods.custom_proforma_invoice.get_items",
                args: {
                    proforma_id : proforma_invoice,
                },
                callback: function(response){
                    if(response.message){
                        data = response.message;
                        console.log(data);

                        // data.item_table.forEach(item =>{
                        //     console.log('Hello',item)
                        //     let row = frm.add_child("custom_item_table",{
                        //         "item_name": item.item_name,
                        //         "description": item.description,
                        //         "qty":item.qty,
                        //         "rate": item.amount,
                        //         "amount": item.amount
                        //     })
                        // })
                        data.item_table.forEach(item =>{
                            let row = frm.add_child('custom_item_table',{
                                "item": item.item,
                                "description": item.description,
                                "completed_percentage": item.completed_percentage,
                                "quantity": item.quantity,
                                "unit": item.unit,
                                "rate": item.rate,
                                "amount": item.amount
                        })});
                        frm.refresh_field('custom_item_table');
                        frm.trigger("make_taxes_and_totals");

                    }
                }
            })
        }
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

    frm.set_value("net_total",netTotal);
    // Directly update the HTML content of the 'total_big' field
	frm.fields_dict['total_big'].$wrapper.html(displayHtml);

}