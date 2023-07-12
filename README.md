# YouBike雙北動態資訊
可在網頁或Android系統上運行  
- [影片連結](https://www.youtube.com/watch?v=3eYjRjsJVn0&t=1s&ab_channel=%E7%BF%94%E5%AE%87%E6%A5%8A)
# API
- [TDX運輸資料流通服務平臺](https://tdx.transportdata.tw/)
# Cordova  
(***請自行斟酌是否在自己電腦上運行 本人不付任何法律責任***)
- 請先安裝Node.js建立環境
- 在[Google雲端](https://drive.google.com/file/d/14M_8gkGTG_tvbtTAlsfeXTEPq6eeB3g4/view?usp=sharing)下載Cordova環境包
- 請先確保CMD(命令提示字元)已關閉
- 左鍵點擊gradle.bat運行
- 右鍵點擊env.bat以系統管理員運行
![image](https://github.com/justin880929/Ubike.github.io/blob/main/UBike/1.PNG)
- 下載本程式***UBike***
- 進入***UBike***檔案打開CMD(命令提示字元)
- 輸入以下指令  
- ***安裝Cordova***  
  npm install -g cordova
- ***安裝網頁部分***  
  cordova platform add browser  
  (***請自行考慮使用甚麼方式呈現***)
- ***安裝Android系統部分***  
  cordova platform add android  
  (***請自行考慮使用甚麼方式呈現 需使用Android模擬器 可自行去下載Android Studio***)
- 這樣就安裝完成了 關閉CMD 再次在***UBike***檔案裡開起CMD
- ***在網頁上運行輸入指令***  
  cordova run browser
- ***在Android系統上運行輸入指令***  
  cordova run android
- APK路徑  
***platforms\android\app\build\outputs\apk\debug\app-debug.apk***
