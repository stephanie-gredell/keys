#!/usr/bin/env sh

mkdir -p _build/templates

for template in templates/*.hbs
do
  template_file=$(basename "$template")
  ./node_modules/handlebars/bin/handlebars ${template} --extension=hbs --amd --min --output _build/templates/${template_file%.*}.js
done