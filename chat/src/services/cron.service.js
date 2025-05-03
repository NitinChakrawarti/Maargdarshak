import cron from 'node-cron';

const ServerRestart = cron.schedule('*/10 * * * * *', () => {
  console.log('⏰ Server Restarted every 10 seconds');
}, {
  scheduled: false,
  timezone: 'Asia/Kolkata'
});

export default ServerRestart;
