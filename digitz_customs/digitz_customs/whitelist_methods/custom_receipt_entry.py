import frappe


@frappe.whitelist()
def get_amount(receipt_entry_id):
    print(receipt_entry_id)
    print(receipt_entry_id)
    print(receipt_entry_id)
    print(receipt_entry_id)
    print(receipt_entry_id)

    amt = frappe.db.get_value('Receipt Entry', receipt_entry_id, 'amount')

    return amt



@frappe.whitelist()
def receipt_allocation(receipt_entry_id, sales_inv_id):
    print(receipt_entry_id)
    print(sales_inv_id)
    receipt_entry = frappe.get_doc("Receipt Entry", receipt_entry_id)
    sales_inv_doc = frappe.get_doc("Sales Invoice", sales_inv_id)
    # Assuming child_data is a dictionary containing values for the child table
    receipt_entry.allocated_amount = sales_inv_doc.net_total
    new_row = receipt_entry.append("receipt_allocation", {
        "reference_type": "Sales Invoice",
        "reference_name": sales_inv_id,
        "customer": sales_inv_doc.customer,
        "total_amount": sales_inv_doc.net_total
    })
    
    # Save the document to persist changes
    receipt_entry.save()
    
    # Optionally, you can return the updated document or any confirmation
    return "Row added successfully"
