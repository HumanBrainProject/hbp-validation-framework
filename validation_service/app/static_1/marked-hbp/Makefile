all:
	@cp lib/marked.js marked.js
	@uglify -o marked.min.js -s lib/marked.js

clean:
	@rm marked.js
	@rm marked.min.js

bench:
	@node test --bench

.PHONY: clean all
