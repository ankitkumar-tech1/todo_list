# 🔧 MongoDB Connection Fix Guide

## Current Error: `bad auth : authentication failed`

Ye error matlab **password ya username wrong hai**.

### ✅ Steps to Fix:

1. **MongoDB Atlas pe jao:**
   - https://cloud.mongodb.com
   - Login karo

2. **Database User Verify Karo:**
   - Left sidebar → **Database Access**
   - Apne user ko find karo: `ankitkumar2431967_db_user`
   - **Edit** button click karo
   - **Password** field check karo
   - Agar password different hai, ya phir **Reset Password** karo

3. **New Password Set Karo:**
   - Simple password use karo (without special characters like `@`)
   - Example: `Asdf9563` ya `MyPassword123`
   - **Update User** click karo

4. **Network Access Check Karo:**
   - Left sidebar → **Network Access**
   - **Add IP Address** button
   - `0.0.0.0/0` add karo (sab IPs allow karne ke liye)
   - **Confirm** click karo

5. **Connection String Copy Karo:**
   - Left sidebar → **Database** → **Connect**
   - **Connect your application** choose karo
   - Connection string copy karo
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/`

6. **`.env` File Update Karo:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todolist?retryWrites=true&w=majority
   ```
   
   **Important:**
   - Password mein agar `@` hai, to use `%40` se replace karo
   - Example: `password@@@` → `password%40%40%40`
   - Database name `/todolist` add karna mat bhoolo

7. **Test Connection:**
   ```powershell
   cd C:\todo_list\server
   node test-db-connection.js
   ```

### 🎯 Quick Fix (Agar Password Reset Kiya):

1. MongoDB Atlas pe **Reset Password** karo
2. Simple password set karo (without `@`)
3. `.env` file mein update karo:
   ```
   MONGODB_URI=mongodb+srv://ankitkumar2431967_db_user:NEW_PASSWORD@taskflow.t4ebbo7.mongodb.net/todolist?retryWrites=true&w=majority
   ```
4. Test karo: `node test-db-connection.js`

---

**Agar abhi bhi error aaye, to mujhe batao - main aur help karunga!** 🚀
