# In your custom app's file (e.g., tcb_customs/api.py)
import frappe

@frappe.whitelist()
def create_quotation(boq_docname):
    boq_doc = frappe.get_doc("BOQ", boq_docname)
    
    items = []
    for item in boq_doc.boq_table:
        labour_material_doc = frappe.get_doc("Labour And Material", item.labour_and_materials)
        for table_item in labour_material_doc.table_labour:
            items.append({
                "item": table_item.item,
                "qty": table_item.quantity or 0,
                "rate": table_item.cost or 0
            })

    # Check if customer with the prospect_id exists
    existing_customer = frappe.get_list("Customer", filters={"custom_prospect_id": boq_doc.customer})
    prospect = frappe.get_doc("Prospect",boq_doc.customer)
    
    if existing_customer:
        # Customer with the prospect_id already exists, do not create a new one
        customer_name = existing_customer[0].name
        # Perform update logic if needed
        # Example: frappe.set_value("Customer", customer_name, "field_name", value)
        return {
            "customer": existing_customer[0].name,  # Adjust this based on your fields
            "items": items,
            "item_name": boq_doc.item_name,
            "new_item_table": boq_doc.boq_table
        }
    else:
        # Customer with the prospect_id does not exist, create a new one
        customer = frappe.new_doc("Customer")
        # Set other fields as needed
        customer.customer_name = prospect.prospect_owner_name
        customer.custom_prospect_id = boq_doc.customer
        customer.customer_group = "All Customer Groups"
        all_areas = frappe.get_list("Area")  

        if all_areas:
            # random selection because of this area is mandtory field
            customer.area = all_areas[0].name
        else:
            custom_area = frappe.new_doc("Area")
            custom_area.area = "Temporary"
            custom_area.emirate = "Abu Dhabi"

            custom_area.insert()
        # Set other fields based on your parameters
        # Example: customer.customer_name = other_parameters["customer_name"]
        
        # Save the new customer document
        customer.insert()

        return {
            "customer": customer.name,  # Adjust this based on your fields
            "items": items,
            "item_name": boq_doc.item_name,
            "new_item_table": boq_doc.boq_table
        }


    
