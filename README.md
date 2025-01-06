# Advanced Library Management System

A backend system for managing a library's books, users, and borrowing activities.

---

## Description

The Advanced Library Management System is designed to help librarians and library staff manage their collections of books, users, and borrowing activities efficiently. It leverages modern web technologies to provide a robust and scalable solution.

---

**Login**
![Screenshot From 2025-01-06 15-35-32](https://github.com/user-attachments/assets/78112550-7e1b-4e9e-95c6-63b0b7cc9770)

**Create category**
![Screenshot From 2025-01-06 17-51-33](https://github.com/user-attachments/assets/23301193-ff69-40c1-8b69-4360c52a151f)

**Create books**
![Screenshot From 2025-01-06 18-03-15](https://github.com/user-attachments/assets/7d36c97a-1c6b-4cec-aeb4-e3e18614db6b)

**Search book by name**
![Screenshot From 2025-01-06 18-03-54](https://github.com/user-attachments/assets/1e8a4e30-bb7f-47e3-975f-37f546f99667)

**Borrow book**
![Screenshot From 2025-01-06 18-27-48](https://github.com/user-attachments/assets/c226219c-8cd0-4f52-920a-a9c6bbf47385)

**Return book**
![Screenshot From 2025-01-06 18-29-06](https://github.com/user-attachments/assets/774a412a-7058-4a0a-bf6c-35a5c68c3088)

**Most borrowed book analytics**
![Screenshot From 2025-01-06 18-29-41](https://github.com/user-attachments/assets/3787cb55-b446-4586-ae22-46c4b8be01f4)

**Delete book**
![Screenshot From 2025-01-06 19-54-23](https://github.com/user-attachments/assets/760800ac-fe35-42e9-bc67-bf90c1802d8a)

**Delete user**
![Screenshot From 2025-01-06 20-08-12](https://github.com/user-attachments/assets/4b6bc59b-3a76-4c26-a9d1-ef32eef08f4d)

**Redis usage: first request for search**
![Screenshot From 2025-01-07 00-23-48](https://github.com/user-attachments/assets/0bb0117a-5974-412a-bc5c-55425d675cb4)

**Redis usage: second request faster !!!**
![Screenshot From 2025-01-07 00-23-57](https://github.com/user-attachments/assets/e571d998-ad9c-4803-a2dc-1f1a62e20558)

---

## Features

- Manage books: Add, update, delete, and search for books.
- Manage users: Register, update, and remove library users.
- Borrowing system: Keep track of borrowed books, due dates, and returns.
- User authentication and authorization.
- Redis for faster retrieve during search.

---

## Installation

To install and run the Advanced Library Management System locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/abhi9ab/Advanced-Library-Management-System.git
    cd Advanced-Library-Management-System
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=3000
    DATABASE_URL=your-database-url
    JWT_SECRET=your-jwt-secret
    SMTP_HOST=your-host
    SMTP_PORT=your-port (example 465)
    SMTP_USER=email
    SMTP_PASS=password
    RATE_LIMIT_WINDOW="15m"
    RATE_LIMIT_MAX="100"
    ```
4. **Confiure the database**

    ```bash
    npx prisma migrate dev
    ```

5. **Run the application:**

    ```bash
    npm start
    ```

6. **Access the application:**

    Open your postman and go to `http://localhost:3000`.

---

**Deliverables:**
[drive link](https://drive.google.com/drive/folders/1zhtr1zR9BXhkAO2ks5vqbwJd33clgkP3?usp=drive_link)

**Database relationship diagrams**

![mermaid-diagram-for-sql-script](https://github.com/user-attachments/assets/d08423f2-b50a-4601-b710-41a732cacefc)

---

## Contact Information

For any questions or inquiries, please contact:

- **Email:** [abhi9ab](abhinabdas004@gmail.com)
