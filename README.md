# 📘 Blog API

---

## ✨ Features

- Create, Read, Update, and Delete (CRUD) blog posts
- Add and manage comments on blog posts
- Like a blog post
- User registration, login and logout with JWT
- Role-based access control (`user` & `admin`)
- Protected routes using authentication middleware
- Prevent brute-force attacks using rate-limiting
- Interactive API testing via Swagger UI

---

## 🛠 Setup

### 1️⃣ Navigate to the project folder

```bash
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
```

### 4️⃣ Start the development server

```bash
npm run dev
```

✅ Server running at: `http://localhost:5000`  
📜 Swagger UI available at: `http://localhost:5000/api-docs`

---

## 📌 API Routes

### 🔐 Authentication Routes

- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → Login and receive a JWT token  
- `POST /api/auth/logout` → Logout and invalidate the JWT token

**Use the returned token in the header for protected routes:**

```
Authorization: Bearer <your_token>
```

Sample register body: `by default role set to user`

```json
{
  "email": "test@example.com",
  "password": "securepassword123",
  "role": "admin"   
}
```

Sample login body: 

```json
{
  "email": "test@example.com",
  "password": "securepassword123"
}
```

---

### 📚 Blog Routes (Protected)

- `GET /api/blogs` → Get all blogs  
- `GET /api/blogs/:id` → Get a single blog  
- `POST /api/blogs` → Create a new blog  
- `PUT /api/blogs/:id` → Update a blog  
- `DELETE /api/blogs/:id` → Delete a blog  
- `PATCH /api/blogs/:id/like` → Like a blog post  

---

### 💬 Comment Routes (Protected)

- `POST /api/blogs/:id/comment` → Add a comment  
- `DELETE /api/blogs/:id/comment/:commentId` → Delete a comment  

---

## 🧪 Testing the API

### ✅ Using Postman

1. Register or login to get your JWT token  
2. Add the token to the Authorization header like so:

```
Authorization: Bearer <your_token>
```

You can now access protected blog and comment routes.

---

### ✅ Using Swagger UI

Visit the Swagger docs in your browser:

```
http://localhost:5000/api-docs
```

1. Click the **Authorize** button  
2. Paste your token with `Bearer ` prefix  
3. Test all available routes directly from the browser

---

## 🛡 Security: Rate Limiting

To prevent brute-force attacks and spamming, rate limiting is enabled for:

- **Login**
- **Register**

Each IP is limited to **5 requests per 15 minutes** on these routes.

---


