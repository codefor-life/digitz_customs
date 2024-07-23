import frappe
import json

@frappe.whitelist()
def create_sales_order(quotation_id):

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


@frappe.whitelist()
def get_sales_order(sales_order_id):
    sales_order_doc = frappe.get_doc("Sales Order",sales_order_id)

    if(sales_order_doc):
        return sales_order_doc
    else:
        return ""