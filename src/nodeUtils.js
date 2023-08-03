import { exec } from 'child_process';

// import dotenv from 'dotenv';
// dotenv.config();

export function openInChrome(url, chromeExePath, profile = null) {
  // const CHROME_EXE_PATH =  `"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"`;

  const profileFlag = profile ? `--profile-directory="${profile}"` : '';
  const cmd = `"${chromeExePath}" --new-tab ${profileFlag} ${url}`;
  // const cmd = `"${process.env.CHROME_EXE_PATH}" --new-tab ${profileFlag} ${url}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      // console.error(`error: ${error.message}`);
      return error;
    }
    if (stderr) {
      // console.error(`stderr: ${stderr}`);
      return stderr;
    }
    if (stdout) {
      // console.log(`stdout: ${stdout}`);
      return 0;
    }
  });
}
