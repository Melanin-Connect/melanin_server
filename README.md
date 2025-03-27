# Blog API

##  Features

-  Create, Read, Update, and Delete (CRUD) blog posts
-  Add and manage comments on blog posts
-  Like a blog post


## 🛠 Setup

###  Navigate to the project folder
```bash
cd backend
```

###  Install dependencies
```bash
npm install
```

###  Set up environment variables
Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
```

### 5️⃣ Start the development server
```bash
npm run dev
```
The server will run at: `http://localhost:5000`

## 📌 API Routes

### Blog Routes
- `GET /api/blogs` → Get all blogs
- `GET /api/blogs/:id` → Get a single blog
- `POST /api/blogs` → Create a new blog
- `PUT /api/blogs/:id` → Update a blog
- `DELETE /api/blogs/:id` → Delete a blog

### Comment Routes
- `POST /api/blogs/:id/comments` → Add a comment
- `DELETE /api/blogs/:id/comments/:commentId` → Delete a comment

### Use Postman to test routes
