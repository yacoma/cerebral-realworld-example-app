.PHONY:	deploylive

deploylive:
	rm -rf node_modules
	npm install
	rm -rf build
	npm run build
