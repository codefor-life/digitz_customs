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
def receipt_allocation_updates(receipt_entry_id, sales_inv_id):
    receipt_entry = frappe.get_doc("Receipt Entry", receipt_entry_id)
    sales_inv_doc = frappe.get_doc("Sales Invoice", sales_inv_id)
    
    # Check if the row already exists in receipt_allocation_copy
    row_exists = False
    for row in receipt_entry.receipt_allocation_copy:
        if (row.reference_type == "Sales Invoice" and
            row.reference_name == sales_inv_id and
            row.customer == sales_inv_doc.customer and
            row.total_amount == sales_inv_doc.net_total):
            row_exists = True
            break
    
    if not row_exists:
        # Append a new row to receipt_allocation_copy
        receipt_entry.allocated_amount = sales_inv_doc.net_total
        new_row = receipt_entry.append("receipt_allocation_copy", {
            "reference_type": "Sales Invoice",
            "reference_name": sales_inv_id,
            "customer": sales_inv_doc.customer,
            "total_amount": sales_inv_doc.net_total
        })
        
        # Save the document to persist changes
        receipt_entry.save()
        
        return "Row added successfully"
    else:
        return "Row already exists, no action taken"
