import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/test/',  // ← 여기에 서브 경로 설정
  plugins: [react()],
})
