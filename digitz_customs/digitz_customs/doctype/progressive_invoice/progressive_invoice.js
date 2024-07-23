// Copyright (c) 2024,   and contributors
// For license information, please see license.txt

frappe.ui.form.on("Progressive Invoice", {
    setup(frm){
        let project_id = localStorage.getItem("project_id");
        localStorage.removeItem("project_id");

        if(project_id){
            frappe.call({
                method: "digitz_customs.digitz_customs.doctype.project.project.get_project",
                args: {
                        project_id: project_id,
                    },
                callback: function(response){ 
                        if(response.message){
                            let data = response.message;
                            console.log("Project Data", data)
                            let all_proforma_invoices = []
    
                            frm.set_value("customer",data.customer);
                            frm.set_value("project",data.name);
                            frm.set_value("retentation_deducation",data.retentation_amt);
                            // frm.set_value()
    
                            data.project_stage_table.forEach(item =>{
                                all_proforma_invoices.push(item.proforma_invoice);
                            }) 
                            console.log(all_proforma_invoices);

                            frappe.call({
                                method: "digitz_customs.digitz_customs.doctype.proforma_invoice.proforma_invoice.get_net_amount_of_stages",
                                args:{
                                    all_proforma_invoices: JSON.stringify(all_proforma_invoices)
                                },
                                callback: function(response){
                                    if(response.message){
                                        let net_total_amts = response.message;
                                        let idx = 0;
                                        let prev_amount = 0; 

                                        data.project_stage_table.forEach(item =>{
                                            let current_amount = net_total_amts[idx];
    
                                            // Calculate amount as sum of prev_amount and current_amount
                                            let amount = prev_amount + current_amount;

                                            let row = frm.add_child("stage_details",{
                                                "item": item.project_stage_defination,
                                                "amount": amount,
                                                "prev_amount": prev_amount,
                                                "current_amount": current_amount,
                                            })

                                            prev_amount = current_amount;
                                            idx += 1;
                                        })
                                        frm.refresh_field('stage_details');
                                    }
                                }
                            })

                            console.log("hello bhaii jui")
                            if(data.advance_entry){
                                frappe.call({
                                    method: "digitz_customs.digitz_customs.whitelist_methods.custom_receipt_entry.get_amount",
                                    args:{
                                        receipt_entry_id: data.advance_entry
                                    },
                                    callback: function(response){
                                        if(response.message){
                                            let amt = response.message;
                                            frm.set_value("advance_deducation", amt);
                                        }
                                    }
                                })    
                            }

                            
                            

                            
                            
                        }
                }
            })
        }
    },
	refresh(frm) {
        
	},
});
