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