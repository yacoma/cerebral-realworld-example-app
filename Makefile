.PHONY:	deploylive

deploylive:
	rm -rf node_modules
	npm install
	npm run build
