.PHONY: build swap-fr swap-fr fr/index.html en/index.html


build: fr/index.html en/index.html
	cp en/index.html index.html

fr/index.html:
	@bash -ec '\
		cp jsonresume-theme-kendall/resume.template jsonresume-theme-kendall/resume.template.bak; \
		trap "mv jsonresume-theme-kendall/resume.template.bak jsonresume-theme-kendall/resume.template" EXIT; \
		cp theme-overrides/resume-fr.template jsonresume-theme-kendall/resume.template; \
		npx resumed render resume-fr.json --theme local --output fr/index.html; \
	'

en/index.html:
	@bash -ec '\
		cp jsonresume-theme-kendall/resume.template jsonresume-theme-kendall/resume.template.bak; \
		trap "mv jsonresume-theme-kendall/resume.template.bak jsonresume-theme-kendall/resume.template" EXIT; \
		cp theme-overrides/resume-en.template jsonresume-theme-kendall/resume.template; \
		npx resumed render resume-en.json --theme local --output en/index.html; \
	'
