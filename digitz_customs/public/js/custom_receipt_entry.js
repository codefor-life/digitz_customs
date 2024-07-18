frappe.ui.form.on("Receipt Entry",{
    refresh: function(frm){
        prev_customer = localStorage.getItem('prev_customer')
        prev_project = localStorage.getItem('prev_project')
        
        if(prev_customer && prev_project){
            console.log("Receipt Entry With Custom Data.")
            frm.set_value('custom_project', prev_project);
            frm.set_value('custom_customer', prev_customer);
            frm.set_value('custom_advance_payment',1)

            localStorage.removeItem('prev_customer');
            localStorage.removeItem('prev_project');
        }

    }
})