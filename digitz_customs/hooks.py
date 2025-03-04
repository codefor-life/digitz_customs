app_name = "digitz_customs"
app_title = "digitz_customs"
app_publisher = " "
app_description = "digitz_customs"
app_email = "info@tcbinfotech.co.in"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/digitz_customs/css/digitz_customs.css"
# app_include_js = "/assets/digitz_customs/js/digitz_customs.js"

# include js, css files in header of web template
# web_include_css = "/assets/digitz_customs/css/digitz_customs.css"
# web_include_js = "/assets/digitz_customs/js/digitz_customs.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "digitz_customs/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# In hooks.py
doctype_js = {
    "Contact": "public/js/contact.js",
    "Quotation": "public/js/quotation.js",
    "Sales Order": "public/js/custom_sales_order.js",
    "Receipt Entry": "public/js/custom_receipt_entry.js",
    "Sales Invoice": "public/js/custom_sales_invoice.js"
    # "Estimation": "public/js/estimation.js"  # Add this line for the Estimation doctype
}

# In hooks.py

# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "digitz_customs/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "digitz_customs.utils.jinja_methods",
# 	"filters": "digitz_customs.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "digitz_customs.install.before_install"
# after_install = "digitz_customs.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "digitz_customs.uninstall.before_uninstall"
# after_uninstall = "digitz_customs.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "digitz_customs.utils.before_app_install"
# after_app_install = "digitz_customs.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "digitz_customs.utils.before_app_uninstall"
# after_app_uninstall = "digitz_customs.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "digitz_customs.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"digitz_customs.tasks.all"
# 	],
# 	"daily": [
# 		"digitz_customs.tasks.daily"
# 	],
# 	"hourly": [
# 		"digitz_customs.tasks.hourly"
# 	],
# 	"weekly": [
# 		"digitz_customs.tasks.weekly"
# 	],
# 	"monthly": [
# 		"digitz_customs.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "digitz_customs.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "digitz_customs.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "digitz_customs.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["digitz_customs.utils.before_request"]
# after_request = ["digitz_customs.utils.after_request"]

# Job Events
# ----------
# before_job = ["digitz_customs.utils.before_job"]
# after_job = ["digitz_customs.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"digitz_customs.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

