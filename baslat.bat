@echo off
title Onyx SMM Panel - Baslat

echo ==============================================
echo       ONYX SMM PANEL BASLATILIYOR
echo ==============================================
echo.

echo [1/3] Bagimliliklar kontrol ediliyor...
call npm install --silent

echo.
echo [2/3] Veritabani (Prisma SQLite) ayarlaniyor...
call npx prisma generate
call npx prisma db push

echo.
echo [3/3] Sunucu baslatiliyor...
echo.
echo Lutfen tarayicinizdan http://localhost:3000 adresine gidin.
echo Kapatmak icin bu pencereyi kapatabilir veya CTRL+C yapabilirsiniz.
echo.

call npm run dev
pause