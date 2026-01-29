# Vercel Deployment Guide

This guide documents the successful deployment configuration for the `ims-backend` project on Vercel.

## 🚀 Successful Configuration Summary

To enable deployment on Vercel's Serverless Node.js runtime, we made the following critical changes:

### 1. **CommonJS Module System**
*   **File:** `package.json`
*   **Change:** Removed `"type": "module"`.
*   **Reason:** Vercel's Node.js runtime sometimes fails to resolve ESM imports (ending in `.js`) that lack file extensions in the built output. Switching to CommonJS ensures broad compatibility and prevents `ERR_MODULE_NOT_FOUND`.

### 2. **TypeScript Configuration**
*   **File:** `tsconfig.json`
*   **Change:** Set `"module": "CommonJS"` and included `"api/**/*"`.
*   **Reason:** Ensures the compiler outputs code compatible with step 1 and includes the Vercel entry point (`api/index.ts`) in the build.

### 3. **Serverless Adapter**
*   **File:** `api/index.ts`
*   **Change:** Switched from `hono/vercel` to `@hono/node-server`.
*   **Reason:** The `hono/vercel` adapter assumes an Edge Runtime (Web Standard Requests). On Vercel's Node.js runtime, we must use `getRequestListener` from `@hono/node-server` to correctly adapt Node's `IncomingMessage` to Hono's `Request`. This fixed the `TypeError: this.raw.headers.get is not a function` error.

### 4. **Database Connection Caching**
*   **File:** `src/config/database.ts`
*   **Change:** Implemented connection caching and removed `process.exit(1)`.
*   **Reason:** In serverless functions, we must reuse the database connection across "hot" lambda invocations to prevent exhausting the connection pool. We also removed `process.exit` because a single connection error should not kill the entire lambda instance.

---

## 🛠️ Deployment Steps

Follow these steps to deploy or redeploy the project.

### 1. Push Code to GitHub
Ensure all the latest fixes are pushed to your repository.
```bash
git add .
git commit -m "chore: ready for deployment"
git push origin main
```

### 2. Vercel Project Configuration (Critical)
Go to your Vercel Project Settings > **General** > **Build & Development Settings**.

Ensure the following settings are active. If not, **Override** them:

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | **Other** (Do NOT use "Hono") |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 3. Environment Variables
Go to **Settings** > **Environment Variables** and ensure these are defined:
*   `MONGODB_URI`
*   `JWT_SECRET`
*   `JWT_REFRESH_SECRET`
*   `NODE_ENV` = `production`

### 4. Deploy
*   If you pushed to GitHub (Step 1), Vercel will auto-deploy.
*   To manually deploy, go to **Deployments** and click **Redeploy** on the latest commit.

---

## 🔍 Debugging
If you encounter errors:
1.  Check **Function Logs** in Vercel Dashboard.
2.  If you see `ERR_MODULE_NOT_FOUND`, ensure you are NOT using `"type": "module"` in `package.json`.
3.  If you see `TypeError: ...headers.get is not a function`, ensure `api/index.ts` uses `@hono/node-server`.
