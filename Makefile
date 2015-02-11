start: build
	@python bin/server.py

build: css rjs hbs
	@cp index.html _build/index.html
	@echo ">>> built!"
css:
	@compass compile

rjs:
	@./node_modules/requirejs/bin/r.js -convert js _build/js
	@cp libs/js/*.js _build/js/libs

hbs:
	@./bin/compile_templates.sh