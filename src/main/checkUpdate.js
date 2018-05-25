import { app, autoUpdater, dialog } from "electron";

function confirmRestart(releaseNotes) {
  return new Promise((resolve, reject) => {
    // 再起動してもよいかを確認するダイアログを表示
    dialog.showMessageBox({
      type: "info",
      title: "Update Available",
      message: "The new version has been downloaded. Restart the application to apply the updates.",
      detail: releaseNotes,
      buttons: ["Restart", "Later"],
    }, function(response) {
      if (response === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

function checkUpdate() {
  let feedURL;
  if (process.platform === "win32") {
    // リリース通知サーバURLの設定（Windowsの場合）
    feedURL = `https://[your-app-release-server].herokuapp.com/update/win32/${app.getVersion()}`;
  } else if (process.platform === "darwin") {
    // リリース通知サーバURLの設定（macOSの場合）
    feedURL = `https://[your-app-release-server].herokuapp.com/update/darwin_${process.arch}/${app.getVersion()}`;
  }

  if (!feedURL) return;

  // 最新バージョンダウンロード完了時の処理
  autoUpdater.on("update-downloaded", (event, releaseNotes) => {
    confirmRestart(releaseNotes).then(() => {
      // 最新バージョンのインストール実行後、再起動
      autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on("error", (e) => {
    console.error(e.message);
  });

  autoUpdater.setFeedURL(feedURL);
  autoUpdater.checkForUpdates();
}

export default checkUpdate;
