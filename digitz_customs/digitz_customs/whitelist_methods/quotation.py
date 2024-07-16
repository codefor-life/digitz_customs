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

    return {
        "customer": boq_doc.customer,  # Adjust this based on your fields
        "items": items,
        "new_item_table": boq_doc.boq_table
    }
