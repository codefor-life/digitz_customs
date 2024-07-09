// Copyright (c) 2024,   and contributors
// For license information, please see license.txt

frappe.ui.form.on("BOQ", {
	refresh(frm) {
        var css = document.createElement('style');
        css.type = 'text/css';
    
        var styles = '.row-index {display:none};';
    
        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName("head")[0].appendChild(css);

        // // Hiding checkboxes and pencil icons for the child table
        // frm.fields_dict['bom_table'].grid.wrapper.find('.grid-row-check, .grid-row-actions').hide();
        
        // // Hiding checkboxes and pencil icons whenever the table is refreshed
        // frm.fields_dict['bom_table'].grid.wrapper.on('render_complete', function() {
        //     frm.fields_dict['bom_table'].grid.wrapper.find('.grid, .grid-row-actions').hide();
        // });


        frm.add_custom_button(__("Create Quotation"), function(){
                //perform desired action such as routing to new form or fetching etc.
                console.log("Button Clicked")
                frappe.new_doc("Quotation")

                // frappe.call({
                //     method: "digitz_customs.digitz_customs.whitelist_methods.quotation.create_quotation",
                //     args:{
                //         quotation_id: frm.doc.name
                //     },
                //     callback: function(r){
                //         if(r.message){
                //             frappe.set_route("Form","Quotation",r.message)
                //         }
                //     }
                // })
        });
	},
});
