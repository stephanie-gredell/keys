start: build
	@python bin/server.py

build: clean css jshint rjs hbs
	@cp -R sass/fonts _build/css/fonts
	@cp index.html _build/index.html
	@echo ">>> built!"
css:
	@compass compile
	@echo ">>> CSS: Compiled!"

rjs:
	@./node_modules/requirejs/bin/r.js -convert js _build/js
	@cp -r libs/js _build/js/libs
	@echo ">>> Javascript: Ready!"

hbs:
	@./bin/compile_templates.sh
	@echo ">>> HBS: Compiled!"

clean:
	@rm -rf _build
	@echo "_build directory clean!"

jshint:
	@node_modules/jshint/bin/jshint js/*
	@echo ">>> JSHint: all good!"