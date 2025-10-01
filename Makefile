.PHONY: build swap-fr swap-fr


build: fr/index.html en/index.html
	cp en/index.html index.html

fr/index.html: swap-fr
	@npx resumed render resume-fr.json --theme local --output fr/index.html

en/index.html: swap-en
	@npx resumed render resume-en.json --theme local --output en/index.html

swap-fr:
	@cp theme-overrides/resume-fr.template jsonresume-theme-kendall/resume.template

swap-en:
	@cp theme-overrides/resume-en.template jsonresume-theme-kendall/resume.template
