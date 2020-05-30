@echo off
chcp 65001

set commit="test"

if [%1] == [] (
  set commit="Automatic commit with my upload batch"
) else (
  set commit=%1
)

git add -A
git commit -m %commit%
git push origin master

echo Sikeres feltöltés