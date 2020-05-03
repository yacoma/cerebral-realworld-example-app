.PHONY:	deploylive

deploylive:
	rm -rf node_modules
	rm package-lock.json
	npm install
	rm -rf build
	npm run build
	rm -rf ../client
	mkdir ../client
	cp -a build ../client
