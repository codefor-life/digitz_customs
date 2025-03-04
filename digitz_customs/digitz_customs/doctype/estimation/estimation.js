// Copyright (c) 2024,   and contributors
// For license information, please see license.txt


frappe.ui.form.on('Estimation', {
    refresh: function(frm) {

    if(!frm.is_new()){
        frm.add_custom_button(__("Create BOQ"), function(){
            //perform desired action such as routing to new form or fetching etc.
            console.log("Button Clicked")
            frappe.call({
                method: "digitz_customs.digitz_customs.whitelist_methods.boq.create_boq",
                args:{
                    estimation_id: frm.doc.name
                },
                callback: function(r){
                    if(r.message){
                        frappe.set_route("Form","BOQ",r.message)
                    }
                }
            })
        });

        frm.add_custom_button(__('Show Created BOQ'), function() {
            // Redirect to BOQ list view with filters applied
            frappe.set_route('List', 'BOQ', {'estimation_id' : frm.doc.name} );
        });
    }

    var css = document.createElement('style');
    css.type = 'text/css';

    var styles = '.row-index {display:none};';

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));
    document.getElementsByTagName("head")[0].appendChild(css);

        // Ensure that the child table has a fieldname in camelCase
        if (frm.fields_dict.table_hpqs) {
            frm.fields_dict['table_hpqs'].grid.wrapper.off("click", ".grid-remove-rows");
            frm.fields_dict['table_hpqs'].grid.wrapper.on("click", ".grid-remove-rows", function(e) {
                // Get the selected rows
                let selected_rows = frm.fields_dict['table_hpqs'].grid.get_selected_children();

                if (selected_rows.length > 0) {
                    let removed_row = selected_rows[0]; // Assuming only one row is selected for removal

                    console.log("Delete Btn clicked", removed_row);

                    let labour_and_materials_id = removed_row.labour_and_materials;

                    if (labour_and_materials_id) {
                        console.log("going for deleting")
                        // Fetch the corresponding Labour and Material doctype
                        frappe.call({
                            method: 'digitz_customs.digitz_customs.whitelist_methods.estimation_and_labour.delete_labour_and_material',
                            args: {
                                labour_id: labour_and_materials_id,
                                est_id: frm.doc.name,
                            },
                            callback: function(response) {
                                if (response.message) {
                                    let msg = response.message;

                                    console.log(msg);
                                    
                                    frm.refresh_fields();
                                    frm.reload_doc();
                                }
                            }
                        });
                    }
                }
            });
        }
    },
    overhead_percentage:function(frm){
        frm.save().then(()=>{
        frappe.call({
            method: 'digitz_customs.digitz_customs.whitelist_methods.estimation_and_labour.calculate_cost_for_each_table_row',
            args: {
                'est_id': frm.doc.name,
                // 'est_id': data.estimation_id,
            },
            callback: function(response) {
                if (!response.exc) {
                    console.log("response",response);
                        frm.refresh_fields()
                        frm.reload_doc()
                } else {
                    frappe.msgprint('Failed to create Labour And Material: ' + response.exc);
                }
            }
        });
    })

    },
    profit_and_margin:function(frm){
        frm.save().then(()=>{
        frappe.call({
            method: 'digitz_customs.digitz_customs.whitelist_methods.estimation_and_labour.calculate_cost_for_each_table_row',
            args: {
                'est_id': frm.doc.name,
                // 'est_id': data.estimation_id,
            },
            callback: function(response) {
                if (!response.exc) {
                    console.log("response",response);
                    frm.refresh_fields()
                    frm.reload_doc()

                } else {
                    frappe.msgprint('Failed to create Labour And Material: ' + response.exc);
                }
            }
        });
    })

    }
});


frappe.ui.form.on('Item Estimation Table', {
    click_btn: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        console.log("row",row);
        console.log("row.labour_and_materials",row.labour_and_materials)

        var is_estimation_exist = true; //if true then not saved and if false then saved in db

        let data = {
            'estimation_id': frm.doc.name,
            'idx': row.idx,
            'category': row.category,
            'type': row.type,
            // Add other fields as needed
        };

        if (!row.labour_and_materials) {
            
            
            let d = new frappe.ui.Dialog({
                title: 'Labour and Material Details',
                fields: [
                    // {
                    //     fieldname: 'estimation_id',
                    //     label: 'Estimation ID',
                    //     fieldtype: 'Data',
                    //     default: data.estimation_id,
                    //     read_only: 1
                    // },
                    // {
                    //     fieldname: 'labour_doc_id',
                    //     label: 'Labout Doc ID',
                    //     fieldtype: 'Data',
                    //     default: data.labour_doc_id,
                    //     read_only: 1
                    // },
                    // {
                    //     fieldname: 'est',
                    //     label: 'Est',
                    //     fieldtype: 'Link',
                    //     default: data.estimation_id
                    // },
                    {
                        fieldname: 'type',
                        label: 'BOQ Item',
                        fieldtype: 'Data',
                        default: data.type,
                        column:2,
                    },
                    {
                        fieldtype: 'Column Break'
                    },
                    {
                        fieldname: 'category',
                        label: 'Category',
                        fieldtype: 'Data',
                        default: data.category,
                        column:2,
                    },
                    {
                        fieldtype: 'Section Break'
                    },
                    {
                        label: 'Items',
                        fieldname: 'items',
                        fieldtype: 'Table',
                        fields: [
                            {
                                fieldname: 'type',
                                label: 'Type',
                                fieldtype: 'Select',
                                options:"\nMaterial\nLabour",
                                in_list_view: 1, 
                                
                                change: function() {
                                    const type = this.value;
                                    // const dialog = this.dialog;
                                    const item_field = d.fields_dict.items.grid.fields_map.item;
    
                                    // Set query to filter items based on selected type
                                    item_field.get_query = function() {
                                        return {
                                            filters: {
                                                'custom_item_type': type
                                            }
                                        };
                                    };
                                }
                               
                               
                              
                            },
                            {
                                fieldname: 'item',
                                label: 'Item',
                                fieldtype: 'Link',
                                options:"Item",
                                in_list_view: 1
                            },
                            {
                                fieldname: 'quantity',
                                label: 'Quantity',
                                fieldtype: 'Int',
                                in_list_view: 1,
                                change: function() {
                                    calculate_amount(d)
                                }          
                            },
                            {
                                fieldname: 'cost',
                                label: 'Rate',
                                fieldtype: 'Int',
                                in_list_view: 1,
                                change: function() {
                                    calculate_amount(d)
                                }          
                            },
                            {
                                fieldname: 'amount',
                                label: 'Amount',
                                fieldtype: 'Int',
                                in_list_view: 1
                            }
                        ],
                        data: []
                    },
                    {
                        fieldname: 'idx',
                        label: 'Idx',
                        fieldtype: 'Data',
                        default: data.idx,
                        read_only: 1,
                        hidden: 1
                    },
                    //  {
                    //     fieldname: 'idxx',
                    //     label: 'Idxx',
                    //     fieldtype: 'Int',
                    //     default: data.idxx,
                    // },
                    
                    // Add more fields as necessary
                ],
                primary_action_label: 'Save',
                primary_action(values) {
                    values.doctype = 'Labour And Material'; // Ensure the correct doctype
                    
                    if (!frm.doc.items) {
                        frm.doc.items = [];
                    }
                    values?.items?.forEach(item => {
                        frm.doc.items.push(item);
                        console.log("items",frm.doc.items)
                    });
                    
                    console.log("values",values)
    
                    frappe.call({
                        method: 'digitz_customs.digitz_customs.whitelist_methods.estimation_and_labour.create_labour_and_material',
                        args: {
                            'doc': JSON.stringify(values),
                            // 'est_id': data.estimation_id,
                        },
                        callback: function(response) {
                            if (!response.exc) {

                                // frm.save();
                                d.hide();
                                // Optionally, you can update the child row with the new document name
                                frappe.model.set_value(cdt, cdn, 'labour_and_materials', response.message.name);
                                frm.save().then(()=>{
                                    frappe.call({
                                        method: 'digitz_customs.digitz_customs.whitelist_methods.estimation_and_labour.append_to_below_table',
                                        args: {
                                            'labourDoc': JSON.stringify(response.message),
                                            'est_id':frm.doc.name,
                                        },
                                        callback: function(response) {
                                            if (!response.exc) {
                                                // console.log("is exists",response);
                                                console.log("nya response",response)
                                                frm.refresh_fields()
                                                frm.reload_doc()
                            
                                            } else {
                                                frappe.msgprint('Failed to create Labour And Material: ' + response.exc);
                                            }
                                        }
                                    });
                                    
                                })


                                


                                // frm.refresh_field('item_estimation_table'); // Replace with your child table fieldname

                            } else {
                                frappe.msgprint('Failed to create Labour And Material: ' + response.exc);
                            }
                        }
                    });
                }
            });


            d.$wrapper.find('.modal-dialog').css("max-width", "90%");
            d.$wrapper.find('.modal-dialog').css("width", "90%");
            
            d.show();
            // Attach event listeners for real-time updates in child table fields
            d.fields_dict.items.grid.wrapper.on('change', 'input[data-fieldname="quantity"], input[data-fieldname="cost"]', function() {
                calculate_child_table_amount(d);
            });
            console.log("-----------------------------------------------------------")
            console.log(d)
            // console.log(d.fields_dict['items'].grid)
  
        } else {
            frappe.call({
                method: 'digitz_customs.digitz_customs.whitelist_methods.estimation_and_labour.get_labour_and_material',
                args: {
                    'doc': JSON.stringify(row.labour_and_materials)
                },
                callback: function(response) {
                    if (!response.exc) {
                        console.log("response",response);
                        

                        let d = new frappe.ui.Dialog({
                            title: 'Labour and Material Details',
                            fields: [
                                // {
                                //     fieldname: 'estimation_id',
                                //     label: 'Estimation ID',
                                //     fieldtype: 'Data',
                                //     default: data.estimation_id,
                                //     read_only: 1
                                // },
                                // {
                                //     fieldname: 'labour_doc_id',
                                //     label: 'Labout Doc ID',
                                //     fieldtype: 'Data',
                                //     default: response.message.labour_and_materials,
                                //     read_only: 1
                                // },
                                // {
                                //     fieldname: 'est',
                                //     label: 'Est',
                                //     fieldtype: 'Link',
                                //     default: data.estimation_id
                                // },
                                {
                                    fieldname: 'type',
                                    label: 'BOQ Item',
                                    fieldtype: 'Data',
                                    default: response.message.type,
                                    column:2,
                                },
                                {
                                    fieldtype: 'Column Break'
                                },
                                {
                                    fieldname: 'category',
                                    label: 'Category',
                                    fieldtype: 'Data',
                                    default: response.message.category,
                                    column:2,
                                },
                                {
                                    fieldtype: 'Section Break'
                                },
                                {
                                    label: 'Items',
                                    fieldname: 'items',
                                    fieldtype: 'Table',
                                    fields: [
                                        {
                                            fieldname: 'type',
                                            label: 'Type',
                                            fieldtype: 'Select',
                                            options:"\nMaterial\nLabour",
                                            in_list_view: 1, 
                                            change: function() {
                                                const type = this.value;
                                                // const dialog = this.dialog;
                                                const item_field = d.fields_dict.items.grid.fields_map.item;
                
                                                // Set query to filter items based on selected type
                                                item_field.get_query = function() {
                                                    return {
                                                        filters: {
                                                            'custom_item_type': type
                                                        }
                                                    };
                                                };
                                            },
                                        },
                                        {
                                            fieldname: 'item',
                                            label: 'Item',
                                            fieldtype: 'Link',
                                            options:"Item",
                                            in_list_view: 1,
                                          
                                        },
                                        {
                                            fieldname: 'quantity',
                                            label: 'Quantity',
                                            fieldtype: 'Int',
                                            in_list_view: 1,
                                            change: function() {
                                                amt = calculate_amount(d)
                                                // console.log("sdfjklaj")
                                                // d.fields_dict.items.grid.fields_map.item.amount = amt;
                                                // d.set_value("amount",amt);
                                            }          
                                        },
                                        {
                                            fieldname: 'cost',
                                            label: 'Rate',
                                            fieldtype: 'Int',
                                            in_list_view: 1,
                                            change: function() {
                                                calculate_amount(d)
                                            }          
                                        },
                                        {
                                            fieldname: 'amount',
                                            label: 'Amount',
                                            fieldtype: 'Int',
                                            in_list_view: 1
                                        }
                                    ],
                                    data: response.message.table_labour || []
                                },
                                {
                                    fieldname: 'idx',
                                    label: 'Idx',
                                    fieldtype: 'Data',
                                    // default: response.message.idx,
                                    read_only: 1,
                                    hidden: 1
                                },
                                //  {
                                //     fieldname: 'idxx',
                                //     label: 'Idxx',
                                //     fieldtype: 'Int',
                                //     default: data.idxx,
                                // },
                            ],
                            primary_action_label: 'Save New Changes',
                            primary_action(values) {
                                values.doctype = 'Labour And Material'; // Ensure the correct doctype
                                values.id = row.labour_and_materials;

                                if (!frm.doc.items) {
                                    frm.doc.items = [];
                                }
                                values.items.forEach(item => {
                                    frm.doc.items.push(item);
                                    console.log("items",frm.doc.items)
                                });
                            
                
                                frappe.call({
                                    method: 'digitz_customs.digitz_customs.whitelist_methods.estimation_and_labour.update_labour_and_material',
                                    args: {
                                        'doc': JSON.stringify(values)
                                    },
                                    callback: function(response) {
                                        if (!response.exc) {
                                            console.log("response",response);
                                            // frappe.msgprint('Labour And Material created successfully!');
                                            // frm.save();
                                            d.hide();
                                            frm.refresh_field('item_estimation_table'); // Replace with your child table fieldname

                                            let labour_and_material_ids = []
                                            for(let i=0;i<frm.doc.table_hpqs.length;i++){
                                                labour_and_material_ids[i] = frm.doc.table_hpqs[i].labour_and_materials;
                                            }
                                            console.log(labour_and_material_ids)
                                            frappe.call({
                                                method: 'digitz_customs.digitz_customs.whitelist_methods.estimation_and_labour.update_below_table',
                                                args: {
                                                    'doc': JSON.stringify(labour_and_material_ids),
                                                    'est_id': frm.doc.name,
                                                },
                                                callback: function(response){
                                                    if(!response.exc) {
                                                        console.log(response)
                                                        console.log(response.message)
                                                        frm.refresh_fields(); // Replace with your child table fieldname
                                                        frm.reload_doc() //refresh_fields
                                                    } else {
                                                        frappe.msgprint('Failed to create Labour And Material: ' + response.exc);
                                                    }
                                                }
                                            })
            
                                        } else {
                                            frappe.msgprint('Failed to create Labour And Material: ' + response.exc);
                                        }
                                    }
                                });
                            }
                        });
                        d.$wrapper.find('.modal-dialog').css("max-width", "90%");
                        d.$wrapper.find('.modal-dialog').css("width", "90%");
                        d.show();
                         // Attach event listeners for real-time updates in child table fields
                            d.fields_dict.items.grid.wrapper.on('change', 'input[data-fieldname="quantity"], input[data-fieldname="cost"]', function() {
                                calculate_child_table_amount(d);
                            });
                    } else {
                        frappe.msgprint('Failed to create Labour And Material: ' + response.exc);
                    }
                }
            });
            
            
        }
    }
});
  

function calculate_amount(d){
    console.log("dsjfsal aslfjal ksjf lakfj asklfj ")
    let qty = d.get_value("quantity") || 0;
    let rate = d.get_value("cost") || 0;
    let amount = qty * rate;

    d.set_value('amount', amount);
    d.refresh_fields(["amount"]);  // Refresh the field to show the updated value
}

function calculate_child_table_amount(dialog) {
    let child_table_data = dialog.fields_dict.items.grid.get_data();
    child_table_data.forEach((row, idx) => {
        let quantity = row.quantity || 0;
        let rate = row.cost || 0;
        let amount = quantity * rate;
        dialog.fields_dict.items.grid.get_row(idx).doc.amount = amount;
    });
    dialog.fields_dict.items.grid.refresh();  // Refresh the table to show updated values
}