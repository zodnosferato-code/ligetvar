import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {execFileSync} from 'node:child_process';
let buildId=process.env.GITHUB_SHA??null;
if(!buildId){try{buildId=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();if(execFileSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim())buildId+='-dirty';}catch{/* Source archives may not have Git metadata. */}}

export default defineConfig({
  define: {__BUILD_ID__:JSON.stringify(buildId)},
  plugins: [react()],
  base: '/ligetvar/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
  },
});
