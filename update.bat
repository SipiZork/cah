@echo off
chcp 65001

set commit="Automatic commit with my upload batch"

if [%1] NEQ [] (
  set commit=%1
)

git add -A
git commit -m %commit%
git push origin master
rem %commit%

echo Sikeres feltöltés