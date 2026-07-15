# **Project Review Request: Support Ticket Management System**

I want you to act as a Senior Software Engineer, Software Architect, Database Designer, UI/UX Reviewer, and Code Reviewer.

Before reviewing my code, first understand my project completely based on the following project description.

---

# **Project Name**

Support Ticket Management System

---

# **Project Overview**

The Support Ticket Management System is a lightweight helpdesk application that allows customers to submit support requests while enabling support staff to efficiently manage, prioritize, and track those requests from creation until resolution.

The purpose of this project is to organize customer issues in one centralized system instead of relying on emails, phone calls, or manual records. The system should help support teams respond quickly, monitor ticket progress, and maintain a history of all support activities.

The project is intended as a CRUD-based database application demonstrating good software engineering practices, proper database design, clean user interface, and maintainable code architecture.

---

# **Project Purpose**

The system aims to:

* Manage customer support requests.  
* Store customer information.  
* Track ticket progress.  
* Assign priorities to important issues.  
* Prevent tickets from being lost.  
* Improve communication between customers and support staff.  
* Provide an overview of all ongoing and completed support requests.  
* Demonstrate CRUD operations with a relational database.

---

# **Target Users**

1. Support Staff  
   * Create tickets  
   * Edit tickets  
   * Update ticket status  
   * Search tickets  
   * Resolve tickets  
2. Administrator (optional)  
   * Manage all tickets  
   * View dashboard statistics  
   * Monitor support performance

---

# **Functional Requirements**

The application should provide the following features.

## **Customer Management**

* Add customer  
* Edit customer  
* Delete customer  
* View customer details  
* Store customer name  
* Store email address

---

## **Ticket Management**

The user should be able to

* Create a ticket  
* View ticket details  
* Update ticket  
* Delete ticket  
* Search tickets  
* Filter tickets

Each ticket should contain

* Ticket ID  
* Title  
* Description  
* Priority  
* Status  
* Customer  
* Date Created  
* Last Updated

---

## **Ticket Priority**

Each ticket should have one of the following priorities:

* Low  
* Medium  
* High  
* Critical (optional)

---

## **Ticket Status**

Each ticket should support:

* Open  
* In Progress  
* Closed

Status should be changeable at any time.

---

## **Search**

The system should allow searching by:

* Ticket title  
* Customer name  
* Customer email  
* Ticket ID

---

## **Dashboard**

The dashboard should display:

* Total Tickets  
* Open Tickets  
* In Progress Tickets  
* Closed Tickets

It may also display

* High Priority Tickets  
* Recently Created Tickets

---

## **Comments (Bonus)**

Each ticket may have comments.

Each comment should include

* Comment ID  
* Ticket ID  
* Comment Text  
* Created Date  
* Created By

---

## **Activity Log (Bonus)**

The system may automatically store activities such as

* Ticket Created  
* Ticket Updated  
* Status Changed  
* Priority Changed  
* Ticket Closed

Each activity should store

* Activity ID  
* Ticket ID  
* Action  
* Timestamp

---

# **Database Requirements**

Minimum tables

## **Customers**

Fields

* customer\_id (Primary Key)  
* name  
* email

---

## **Tickets**

Fields

* ticket\_id (Primary Key)  
* customer\_id (Foreign Key)  
* title  
* description  
* priority  
* status  
* created\_at  
* updated\_at

---

Optional tables

### **Comments**

* comment\_id  
* ticket\_id  
* comment  
* created\_at

### **Activity\_Log**

* activity\_id  
* ticket\_id  
* action  
* created\_at

---

# **CRUD Operations**

The project must support complete CRUD functionality.

Create

* Create customer  
* Create ticket

Read

* View customers  
* View tickets  
* Search tickets

Update

* Edit customer  
* Edit ticket  
* Update status  
* Update priority

Delete

* Delete customer  
* Delete ticket

---

# **Non-Functional Requirements**

The application should satisfy the following quality requirements.

## **Performance**

* Pages should load quickly.  
* Database queries should be optimized.  
* Searching should be responsive.

---

## **Reliability**

* Data should remain consistent.  
* Foreign key relationships should be maintained.  
* Invalid data should be prevented.

---

## **Usability**

* Simple interface.  
* Easy navigation.  
* User-friendly forms.  
* Clear validation messages.

---

## **Security**

* Validate all user input.  
* Prevent SQL Injection.  
* Prevent duplicate customers where appropriate.  
* Handle invalid requests gracefully.

---

## **Maintainability**

* Clean project structure.  
* Reusable components.  
* Proper naming conventions.  
* Modular code.  
* Easy to extend.

---

## **Scalability**

The design should allow future features such as:

* Multiple support agents  
* Authentication  
* Email notifications  
* File attachments  
* Ticket categories  
* Departments  
* Reporting

---

# **Expected Workflow**

1. Customer is created.  
2. A support ticket is created for that customer.  
3. Ticket starts with "Open" status.  
4. Support staff updates the ticket to "In Progress".  
5. Staff resolves the issue.  
6. Ticket status becomes "Closed".  
7. Dashboard statistics update automatically.

---

# **What I Want You To Review**

After understanding the project, review my entire project like an experienced software engineer.

Please evaluate the following:

## **1\. Functional Completeness**

* Have I implemented all required features?  
* Which required features are missing?  
* Which bonus features are missing?

---

## **2\. Database Design**

Review:

* Table design  
* Relationships  
* Primary keys  
* Foreign keys  
* Constraints  
* Normalization  
* Naming conventions  
* Missing fields  
* Redundant data

Suggest improvements.

---

## **3\. Backend Review**

Review

* Business logic  
* CRUD implementation  
* Error handling  
* Validation  
* Code duplication  
* API design (if applicable)  
* Project architecture

Point out bugs and possible improvements.

---

## **4\. Frontend Review**

Review

* UI design  
* User experience  
* Form validation  
* Responsiveness  
* Accessibility  
* Navigation  
* Dashboard usability

Identify areas needing improvement.

---

## **5\. Code Quality**

Review

* Readability  
* Maintainability  
* Naming conventions  
* Code organization  
* SOLID principles  
* Separation of concerns  
* Reusability

Point out bad practices and suggest better implementations.

---

## **6\. Performance**

Identify

* Slow queries  
* Unnecessary database calls  
* Repeated code  
* Memory inefficiencies  
* Performance bottlenecks

Provide optimization suggestions.

---

## **7\. Security Review**

Check for

* SQL Injection risks  
* Input validation  
* Error exposure  
* Hardcoded secrets  
* Authentication issues (if any)

Suggest security improvements.

---

## **8\. Bugs**

Identify

* Runtime errors  
* Logical errors  
* Edge cases  
* Incorrect CRUD operations  
* Broken navigation  
* Validation failures  
* Missing exception handling

Explain why each issue is a problem and how to fix it.

---

## **9\. Missing Features**

List every feature that should exist according to the project requirements but is missing.

Rank them by priority.

---

## **10\. Overall Evaluation**

Finally provide:

* Overall project score out of 100  
* Database design score  
* Backend score  
* Frontend score  
* UI/UX score  
* Code quality score  
* Maintainability score  
* Security score

Also include:

* Biggest strengths  
* Biggest weaknesses  
* What should be fixed first  
* What can be improved later  
* Whether this project is suitable for a university database/software engineering assignment

Do not assume missing functionality—only evaluate what exists in the code I provide. When you identify an issue, explain why it matters and include a practical recommendation for fixing it.

