.PHONY:	deploylive

deploylive:
	rm -rf node_modules
	rm package-lock.json
	npm install
	rm -rf build
	npm run build
	rm -rf ../client/build
	mkdir -p ../client
	cp -a build ../client
