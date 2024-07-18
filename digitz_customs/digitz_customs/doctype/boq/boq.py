# Copyright (c) 2024,   and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import nowdate


class BOQ(Document):
	pass





@frappe.whitelist()
def create_boq(estimation_id):
    print(estimation_id)
    estimation_doc = frappe.get_doc("Estimation", estimation_id)
    print(estimation_doc)
    
    boq_doc = frappe.new_doc("BOQ")
    boq_doc.project_name = estimation_doc.project_name
    boq_doc.date = nowdate()
    boq_doc.estimation_id = estimation_id
    boq_doc.boq_table = []
    boq_doc.customer = estimation_doc.prospect

    # Copy data from estimation_doc to boq_doc as needed
    for row in estimation_doc.table_hpqs:
        boq_doc.append("boq_table",{
            "category": row.category,
            "type": row.type,
            "width_meter": row.width_meter,
            "height_meter": row.height_meter,
            "quantity": row.quantity,
            "area": row.area,
            "perimeter": row.perimeter,
            "selling_sum": row.selling_sum,
            "rateno": row.rateno,
            "ratem2": row.ratem2,
            "labour_and_materials": row.labour_and_materials,
            "description": row.description
		})

    boq_doc.insert()
    return boq_doc.name

