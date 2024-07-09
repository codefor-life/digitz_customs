

import frappe


@frappe.whitelist()
def create_quotation(quotation_id):
    print("Done",quotation_id)

    return "done"