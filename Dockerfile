# FROM node:18-alpine
# WORKDIR /app
# COPY package.json pnpm-lock.yaml ./
# RUN npm install -g pnpm && pnpm install --frozen-lockfile
# COPY . .
# RUN pnpm run build
# FROM nginx:alpine
# COPY --from=0 /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

#===========================================================================
# Gunakan image Node.js sebagai base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan pnpm-lock.yaml (agar caching lebih efisien)
COPY package.json pnpm-lock.yaml ./

# Instal dependensi menggunakan pnpm
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Salin seluruh proyek ke dalam container
COPY . .

# Build aplikasi
RUN pnpm run build

# Gunakan image server ringan untuk menyajikan hasil build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy konfigurasi Nginx yang sudah diperbaiki
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ekspose port 80
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]

