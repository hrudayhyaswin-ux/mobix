# 🤗 MOBILIX — HUGGING FACE BACKEND & INFERENCE INTEGRATION GUIDE

This document explains the two ways MOBILIX connects with **Hugging Face**:
1. **Hugging Face Inference API** (Live AI LLM integration in the Assistant)
2. **Hugging Face Spaces Hosting** (Hosting the containerized backend 24/7 on Hugging Face Docker Spaces)

---

## 1. 🤖 HUGGING FACE INFERENCE API (Active in Code)

The backend endpoint `POST /api/ai/ask` in [`api/index.ts`](file:///Users/ksvhrudayhyaswin/Desktop/mobilix/api/index.ts) is wired to call **Hugging Face's Serverless Inference API** using `mistralai/Mistral-7B-Instruct-v0.3`.

### How to Activate Live Hugging Face LLM Responses:
1. Go to your Hugging Face account: [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Generate a free **Access Token** (Read permission).
3. Add the token to your environment:
   - **Local `.env`**:
     ```bash
     HF_TOKEN=hf_your_token_here
     ```
   - **On Vercel Production**:
     ```bash
     npx vercel env add HF_TOKEN
     ```
     *(Or add it in the Vercel Dashboard under **Project Settings → Environment Variables**)*.

4. Once added, `GET /api/ai/status` will report:
   ```json
   {
     "success": true,
     "huggingFaceConnected": true,
     "model": "Hugging Face (Mistral-7B-Instruct-v0.3)",
     "info": "Connected to Hugging Face Serverless Inference API"
   }
   ```
   *(If no token is supplied, MOBILIX automatically falls back to its zero-latency smart rule heuristics, guaranteeing 100% uptime).*

---

## 2. 🚀 DEPLOYING BACKEND AS A HUGGING FACE SPACE (DOCKER)

You can host the MOBILIX Express backend as a free, persistent **Hugging Face Docker Space**:

### Step 1: Create a New Space on Hugging Face
1. Go to [https://huggingface.co/new-space](https://huggingface.co/new-space)
2. Space Name: `mobilix-backend`
3. License: `MIT`
4. SDK: Select **Docker** (Blank)
5. Visibility: **Public**
6. Click **Create Space**

### Step 2: Push This Repository to Hugging Face
Run these commands in your project directory:

```bash
# Add your Hugging Face Space as a git remote
git remote add hf https://huggingface.co/spaces/<your-hf-username>/mobilix-backend

# Push code to Hugging Face Space
git push hf main
```

*(Note: Hugging Face Spaces exposes port `7860` by default. [`Dockerfile`](file:///Users/ksvhrudayhyaswin/Desktop/mobilix/Dockerfile) and [`api/index.ts`](file:///Users/ksvhrudayhyaswin/Desktop/mobilix/api/index.ts) automatically detect Hugging Face Spaces and bind to port `7860`).*

### Step 3: Link Vercel Frontend to Hugging Face Backend
Once your Hugging Face Space is building, it gives you a public URL:
`https://<your-username>-mobilix-backend.hf.space`

You can link it in Vercel:
```bash
npx vercel env add VITE_API_URL
# Value: https://<your-username>-mobilix-backend.hf.space
```

Now your frontend runs on **Vercel** (`https://mobilix-blue.vercel.app`) and connects directly to your backend on **Hugging Face**!
