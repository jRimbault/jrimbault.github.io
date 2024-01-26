.PHONY: build swap-fr swap-fr


build: index-fr.html index-en.html
	cp index-en.html index.html

index-fr.html: swap-fr
	@npx resumed render resume-fr.json --theme local --output index-fr.html

index-en.html: swap-en
	@npx resumed render resume-en.json --theme local --output index-en.html

swap-fr:
	@cp jsonresume-theme-kendall/resume-fr.template jsonresume-theme-kendall/resume.template

swap-en:
	@cp jsonresume-theme-kendall/resume-en.template jsonresume-theme-kendall/resume.template
