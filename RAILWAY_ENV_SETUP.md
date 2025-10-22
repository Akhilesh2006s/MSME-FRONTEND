# Railway Environment Variables Setup

## Required Environment Variables for Railway Dashboard:

### 1. Database Configuration
```
MONGODB_URI=mongodb://mongo:27017/exportease
```

### 2. JWT Configuration
```
JWT_SECRET=your-super-secret-jwt-key-here-make-it-very-long-and-random
JWT_EXPIRES_IN=7d
```

### 3. Server Configuration
```
PORT=5000
NODE_ENV=production
```

### 4. Gemini AI Configuration
```
GEMINI_API_KEY=your-actual-gemini-api-key-here
```

### 5. CORS Configuration (IMPORTANT!)
```
FRONTEND_URL=https://your-frontend-domain.com
```
**Or for local development:**
```
FRONTEND_URL=http://localhost:3000
```

### 6. Rate Limiting
```
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## How to Set in Railway:

1. Go to your Railway project dashboard
2. Click on your backend service
3. Go to "Variables" tab
4. Add each variable with its value
5. Click "Deploy" to restart with new variables

## Important Notes:

- Replace `your-super-secret-jwt-key-here-make-it-very-long-and-random` with a strong, random secret key
- Replace `your-actual-gemini-api-key-here` with your real Gemini API key
- Replace `https://your-frontend-domain.com` with your actual frontend URL
- The MONGODB_URI should be automatically provided if you're using Railway's MongoDB service

## Current Backend URL:
`https://msme-backend-production-17d7.up.railway.app`
