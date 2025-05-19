import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/test/',  // ← 여기에 서브 경로 설정
  plugins: [react()],
  build: {
    minify: false  // 👉 이 줄을 추가하면 React error #310 디버깅에 도움이 됩니다
  },
})
