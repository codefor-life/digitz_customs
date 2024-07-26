# # Copyright (c) 2024,   and contributors
# # For license information, please see license.txt

# import frappe
# from frappe import _




# def execute(filters=None):
# 	columns = get_columns()
# 	data = []

# 	data = frappe.db.get_all(
# 		"Project",
# 		filters=filters,
# 		fields=[
# 			"name",
# 			"status",
# 			"expected_start_date",
# 			"expected_end_date",
# 			"project_amount"
# 		],
# 		order_by="expected_end_date",
# 	)

# 	# for project in data:
# 		# project["total_tasks"] = frappe.db.count("Task", filters={"project": project.name})
# 		# project["completed_tasks"] = frappe.db.count(
# 		# 	"Task", filters={"project": project.name, "status": "Completed"}
# 		# )
# 		# project["overdue_tasks"] = frappe.db.count(
# 		# 	"Task", filters={"project": project.name, "status": "Overdue"}
# 		# )

# 	chart = get_chart_data(data)
# 	report_summary = get_report_summary(data)

# 	return columns, data, None, chart, report_summary


# def get_columns():
# 	return [
# 		{
# 			"fieldname": "name",
# 			"label": _("Project"),
# 			"fieldtype": "Link",
# 			"options": "Project",
# 			"width": 170,
# 		},
# 		# {
# 		# 	"fieldname": "project_type",
# 		# 	"label": _("Type"),
# 		# 	"fieldtype": "Link",
# 		# 	"options": "Project Type",
# 		# 	"width": 120,
# 		# },
# 		{
# 			"fieldname": "status", 
# 			"label": _("Status"), 
# 			"fieldtype": "Data", 
# 			"width": 120
# 		},
# 		# {"fieldname": "total_tasks", "label": _("Total Tasks"), "fieldtype": "Data", "width": 120},
# 		# {
# 		# 	"fieldname": "completed_tasks",
# 		# 	"label": _("Tasks Completed"),
# 		# 	"fieldtype": "Data",
# 		# 	"width": 120,
# 		# },
# 		# {"fieldname": "overdue_tasks", "label": _("Tasks Overdue"), "fieldtype": "Data", "width": 120},
# 		# {"fieldname": "percent_complete", "label": _("Completion"), "fieldtype": "Data", "width": 120},
# 		{
# 			"fieldname": "expected_start_date",
# 			"label": _("Start Date"),
# 			"fieldtype": "Date",
# 			"width": 120,
# 		},
# 		{
# 			"fieldname": "expected_end_date", 
#    			"label": _("End Date"), 
# 			"fieldtype": "Date", 
# 			"width": 120
# 		},
# 		{
# 			"fieldname": "project_amount", 
#    			"label": _("Project Amount"), 
# 			"fieldtype": "Currency", 
# 			"width": 150
# 		},
# 	]


# def get_chart_data(data):
# 	labels = []
# 	total = []
# 	completed = []
# 	overdue = []

# 	for project in data:
# 		labels.append(project.name)
# 		# total.append(project.total_tasks)
# 		# completed.append(project.completed_tasks)
# 		# overdue.append(project.overdue_tasks)

# 	return {
# 		"data": {
# 			"labels": labels[:30],
# 			"datasets": [
# 				{"name": _("Overdue"), "values": overdue[:30]},
# 				{"name": _("Completed"), "values": completed[:30]},
# 				{"name": _("Total Tasks"), "values": total[:30]},
# 			],
# 		},
# 		"type": "bar",
# 		"colors": ["#fc4f51", "#78d6ff", "#7575ff"],
# 		"barOptions": {"stacked": True},
# 	}


# def get_report_summary(data):
# 	if not data:
# 		return None

# 	# avg_completion = sum(project.percent_complete for project in data) / len(data)
# 	avg_completion = 0
# 	total = 0
# 	total_overdue = 0
# 	completed  = 0
# 	# total = sum([project.total_tasks for project in data])
# 	# total_overdue = sum([project.overdue_tasks for project in data])
# 	# completed = sum([project.completed_tasks for project in data])

# 	return [
# 		{
# 			"value": avg_completion,
# 			"indicator": "Green" if avg_completion > 50 else "Red",
# 			"label": _("Average Completion"),
# 			"datatype": "Percent",
# 		},
# 		{
# 			"value": total,
# 			"indicator": "Blue",
# 			"label": _("Total Tasks"),
# 			"datatype": "Int",
# 		},
# 		{
# 			"value": completed,
# 			"indicator": "Green",
# 			"label": _("Completed Tasks"),
# 			"datatype": "Int",
# 		},
# 		{
# 			"value": total_overdue,
# 			"indicator": "Green" if total_overdue == 0 else "Red",
# 			"label": _("Overdue Tasks"),
# 			"datatype": "Int",
# 		},
# 	]


import frappe

def execute(filters=None):
    columns = [
        {"fieldname": "name", "label": "Project ID", "fieldtype": "Data", "width": 120},
        {"fieldname": "docstatus", "label": "Docstatus", "fieldtype": "Int", "width": 120},
        {"fieldname": "name1", "label": "Project Name", "fieldtype": "Data", "width": 120},
        {"fieldname": "retentation_percentage", "label": "Retention Percentage", "fieldtype": "Percent", "width": 120},
        {"fieldname": "retentation_amt", "label": "Retention Amount", "fieldtype": "Currency", "width": 120},
        {"fieldname": "expected_start_date", "label": "Expected Start Date", "fieldtype": "Date", "width": 120},
        {"fieldname": "expected_end_date", "label": "Expected End Date", "fieldtype": "Date", "width": 120},
        {"fieldname": "status", "label": "Status", "fieldtype": "Data", "width": 120},
        {"fieldname": "project_amount", "label": "Project Amount", "fieldtype": "Currency", "width": 120},
        {"fieldname": "project_delivery_date", "label": "Project Delivery Date", "fieldtype": "Date", "width": 120},
        {"fieldname": "priority", "label": "Priority", "fieldtype": "Data", "width": 120},
        {"fieldname": "advance_entry", "label": "Advance Entry", "fieldtype": "Currency", "width": 120},
        {"fieldname": "amount_after_retentation", "label": "Amount After Retention", "fieldtype": "Currency", "width": 120},
        {"fieldname": "project_stage_defination", "label": "Project Stage Definition", "fieldtype": "Data", "width": 120},
        {"fieldname": "percentage_of_completion", "label": "Percentage of Completion", "fieldtype": "Percent", "width": 120},
        {"fieldname": "proforma_invoice", "label": "Proforma Invoice", "fieldtype": "Data", "width": 120},
        {"fieldname": "sales_invoice", "label": "Sales Invoice", "fieldtype": "Data", "width": 120},
        {"fieldname": "net_total", "label": "Net Total", "fieldtype": "Currency", "width": 120},  # New Column
    ]

    conditions = ""
    if filters.get("project"):
        conditions += "AND p.name = %(project)s "
    if filters.get("status"):
        conditions += "AND p.status = %(status)s "

    data = frappe.db.sql(f"""
        SELECT
            p.name,
            p.docstatus,
            p.name1,
            p.retentation_percentage,
            p.retentation_amt,
            p.expected_start_date,
            p.expected_end_date,
            p.status,
            p.project_amount,
            p.project_delivery_date,
            p.priority,
            p.advance_entry,
            p.amount_after_retentation,
            pst.project_stage_defination,
            pst.percentage_of_completion,
            pst.proforma_invoice,
            pst.sales_invoice,
            pst.net_total
        FROM
            `tabProject` p
        LEFT JOIN
            `tabProject Stages Table` pst ON pst.parent = p.name
        WHERE
            1=1
            {conditions}
        ORDER BY
            p.creation DESC
    """, filters, as_dict=True)

    # Calculate total project amount and percentage of completion

    # Calculate the total amount received from sales invoices
    # total_received_amount = 0
    # for row in data:
    #     if row["sales_invoice"]:
    #         sales_invoices = row["sales_invoice"].split(",")
    #         for invoice in sales_invoices:
    #             total_received_amount += frappe.db.get_value("Sales Invoice", invoice, "net_total") or 0
    project_totals =  {}
    for row in data:
        id = row["name"]
        project_totals[id] = row["project_amount"]
        sales_invoice_net_totals = [row["net_total"] for row in data if row["net_total"] is not None]


    # Calculate average percentage of completion
    if filters.get("project"):
        print (data)
        total_project_amount = data[0].project_amount
        percentage_values = [row["percentage_of_completion"] for row in data if row["percentage_of_completion"] is not None]
        total_percentage_of_completion = sum(percentage_values)

        summary = [
        {"label": "Total Percentage of Completion", "value": round(total_percentage_of_completion)},
        {"label": "Total Project Amount", "value": total_project_amount},
        {"label": "Total Amount Received", "value": sum(sales_invoice_net_totals)},
        {"label": "Pending Amount", "value": total_project_amount - sum(sales_invoice_net_totals)}
        ]
    else:
        print()
        print(project_totals)
        print()
        total_project_amount = 0 
        for p in project_totals.values():
            total_project_amount += p
        percentage_values = [row["percentage_of_completion"] for row in data if row["percentage_of_completion"] is not None]
        total_percentage_of_completion = sum(percentage_values) / len(percentage_values) if percentage_values else 0


        summary = [
            {"label": "Average Percentage of Completion", "value": round(total_percentage_of_completion,2)},
            {"label": "Total Project Amount", "value": total_project_amount},
            {"label": "Total Amount Received", "value": sum(sales_invoice_net_totals)},
            {"label": "Pending Amount", "value": total_project_amount - sum(sales_invoice_net_totals)}
        ]

    chart_data = {
        "data": {
            "labels": [],
            "datasets": [
                {"name": "Percentage of Completion", "values": [], "chartType": "bar"},
                {"name": "Project Amount", "values": [], "chartType": "bar"}
            ]
        },
        "type": "bar",
        "colors": ["#3498db", "#2ecc71"]  # Blue, Green
    }

    for row in data:
        chart_data["data"]["labels"].append(row["name1"])
        chart_data["data"]["datasets"][0]["values"].append(row["percentage_of_completion"])
        chart_data["data"]["datasets"][1]["values"].append(row["project_amount"])

    return columns, data, None, chart_data, summary

