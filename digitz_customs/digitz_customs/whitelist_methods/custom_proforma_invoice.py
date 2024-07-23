import frappe


@frappe.whitelist()
def get_items(proforma_id):
    try:
        proforma_doc = frappe.get_doc("Proforma Invoice",proforma_id)

        if(proforma_doc):
            return proforma_doc
        else:
            return ""
    except:
        frappe.throw("Can't Get Data From Proforma Invoice.")