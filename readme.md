
```
git commit -a -m 'update'
git push

curl -H "Content-Type: application/json" -X POST -d '{"cmd":"git pull"}' http://192.168.1.20:4444/cmd
curl -H "Content-Type: application/json" -X GET http://192.168.1.20:4444/kill/kasse
curl -H "Content-Type: application/json" -X POST -d '{"cmd":"node --debug-brk=5555 --expose-debug-as=v8debug ./backend/mdb2sheet.js"}' http://192.168.1.20:4444/cmd/kasse
```
