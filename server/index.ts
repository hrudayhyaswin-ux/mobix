import app from '../api/index.ts';

const PORT = process.env.PORT || (process.env.SPACE_ID ? 7860 : 5001);

const startServer = (port: number) => {
  const server = app.listen(port, () => {
    console.log(`⚡ MOBILIX Backend server running on port ${port} (Docker / HF Space ready)`);
  });
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    }
  });
};

if (!process.env.VERCEL) {
  startServer(Number(PORT));
}

export default app;
