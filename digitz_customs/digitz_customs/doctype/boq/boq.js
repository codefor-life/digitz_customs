// Copyright (c) 2024,   and contributors
// For license information, please see license.txt

// frappe.ui.form.on("BOQ", {
// 	refresh(frm) {
//         var css = document.createElement('style');
//         css.type = 'text/css';
    
//         var styles = '.row-index {display:none};';
    
//         if (css.styleSheet) css.styleSheet.cssText = styles;
//         else css.appendChild(document.createTextNode(styles));
//         document.getElementsByTagName("head")[0].appendChild(css);

//         // // Hiding checkboxes and pencil icons for the child table
//         // frm.fields_dict['bom_table'].grid.wrapper.find('.grid-row-check, .grid-row-actions').hide();
        
//         // // Hiding checkboxes and pencil icons whenever the table is refreshed
//         // frm.fields_dict['bom_table'].grid.wrapper.on('render_complete', function() {
//         //     frm.fields_dict['bom_table'].grid.wrapper.find('.grid, .grid-row-actions').hide();
//         // });

//         if (!frm.is_new()) {
//         frm.add_custom_button(__("Create Quotation"), function(){
//                 //perform desired action such as routing to new form or fetching etc.
//                 console.log("Button Clicked")
//                 // frappe.new_doc("Quotation")

//                 frappe.call({
//                     method: "digitz_customs.digitz_customs.whitelist_methods.quotation.create_quotation",
//                     args:{
//                         boq_docname: frm.doc.name
//                     },
//                     // callback: function(r){
//                         // if(r.message){
//                         //     frappe.set_route("Form","Quotation",r.message)
//                         // }
//                     // }
//                     callback: function(response) {
//                         if (response.message) {
//                             console.log(response)
//                             // Redirect to the new Quotation form with pre-filled data
//                             frappe.set_route('Form', 'Quotation', 'new-quotation-wsfcmidwnp', {
//                                 items: response.message.items,
//                                 customer: response.message.customer
//                             });
//                         }
//                 }
//             })
//         });
//         }
// 	},
// });


// In your BoQ doctype JavaScript file (boq.js)
frappe.ui.form.on('BOQ', {
    refresh: function(frm) {
        var css = document.createElement('style');
        css.type = 'text/css';
    
        var styles = '.row-index {display:none};';
    
        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName("head")[0].appendChild(css);

        if (!frm.is_new()) {
            frm.add_custom_button(__('Create Quotation'), function() {
                frappe.call({
                    method: "digitz_customs.digitz_customs.whitelist_methods.quotation.create_quotation",
                    args: {
                        boq_docname: frm.doc.name
                    },
                    callback: function(response) {
                        if (response.message) {
                            // Store the data in localStorage to pass it to the new Quotation form
                            localStorage.setItem('quotation_data', JSON.stringify(response.message));
                            console.log("done")
                            // Redirect to the new Quotation form
                            frappe.set_route('Form', 'Quotation', 'new-quotation-wsfcmidwnp')
                        
                        }
                    }
                });
            });


            frm.add_custom_button(__('Show Created Quotation'), function() {
                // Redirect to BOQ list view with filters applied
                // frappe.set_route('List', 'Quotation', {'custom_estimation_id' : frm.doc.estimation_id} );
                frappe.set_route('List','Quotation',{'custom_boq_id': frm.doc.name});
            });
        }
    }
});

// In your Quotation doctype JavaScript file (quotation.js)
// frappe.ui.form.on('Quotation', {
//     onload: function(frm) {
//         console.log("asdfhkjljsfhkjsk fjlksfh sdkjfhkj s")
//         // Retrieve the data from localStorage
//         let data = localStorage.getItem('quotation_data');
//         if (data) {
//             data = JSON.parse(data);

//             // Set the fields with the retrieved data
//             frm.set_value('customer', data.customer);
//             data.items.forEach(item => {
//                 let row = frm.add_child('items', {
//                     item_code: item.item_code,
//                     qty: item.qty,
//                     rate: item.rate
//                 });
//             });

//             // Refresh the field to show the added rows
//             frm.refresh_field('items');

//             // Clear the data from localStorage
//             localStorage.removeItem('quotation_data');
//         }
//     }
// });
