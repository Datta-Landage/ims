# Deployment Guide for Vercel (ims hussain)

## Prerequisites
- A Vercel account.
- Vercel CLI installed (`npm i -g vercel`) OR connect your GitHub repository to Vercel.

## Setup Steps

1.  **Install Dependencies:**
    You must install the new dependencies added for Vercel support.
    ```bash
    npm install
    ```

2.  **Verify Local Run:**
    Check if the project runs locally in the Node.js environment (which mimics Vercel).
    ```bash
    npm run build
    npm run start
    ```

## Deployment Steps

1.  **Push to Git:**
    ```bash
    git add .
    git commit -m "chore: configure for vercel"
    git push
    ```

2.  **Import to Vercel:**
    3.  **Configure Project Settings (Critical):**
    *   **Framework Preset:** Select **Other**. (Do NOT use "Hono" default if suggested, as it may conflict with our custom `vercel.json`).
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
    *   **Install Command:** `npm install`

3.  **Environment Variables:**
    - Copy from your local `.env`.
    - Set `MONGODB_URI`, `JWT_SECRET`, etc. in Vercel.
    - Set `NODE_ENV` to `production`.

4.  **Deploy:**
    - Click **Deploy**.
