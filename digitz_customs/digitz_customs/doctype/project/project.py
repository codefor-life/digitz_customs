# Copyright (c) 2024,   and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Project(Document):
	pass




@frappe.whitelist()
def create_project_via_sales_order(sales_order_id):
		print(sales_order_id)

		sales_doc = frappe.get_doc("Sales Order",sales_order_id)

		return{
			"customer": sales_doc.customer,
			"sales_order":sales_doc.name
		}