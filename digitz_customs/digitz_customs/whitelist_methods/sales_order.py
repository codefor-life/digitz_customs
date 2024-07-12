import frappe
import json

@frappe.whitelist()
def create_sales_order(quotation_id):
    print(quotation_id)

    qoc_doc = frappe.get_doc("Quotation", quotation_id)
    
    # items = []
    # for item in qoc_doc.items:
    #     labour_material_doc = frappe.get_doc("Labour And Material", item.labour_and_materials)
    #     for table_item in labour_material_doc.table_labour:
    #         items.append({
    #             "item": table_item.item,
    #             "qty": table_item.quantity or 0,
    #             "rate": table_item.cost or 0
    #         })

    return {
        qoc_doc,
    }