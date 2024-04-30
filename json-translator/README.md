# JSON Translator

## Docs:
  *  This is a very silly JSON translator that parses dictionaries and uses fuzzy to translate sentences
  *  It basically looks in the dictionaries for words similar to the input and swapes based on those
  *  But it also has a threshold and a fuzzy ratio (distance) for knowing when to swape for similars or not swape

## Translate:
  *  Create a new virtual environment `venv` in python by running `python3 -m venv venv`
  *  Activate the virtual environment by executing `source venv/bin/activate`
  *  Installing all reqs from `reqs.txt` using `pip install -r reqs.txt`
  *  Then set the `translate.py` to specify the languages and input sentence
  *  And finally run `python3 translate.py` for printing the result

## Data:
  *  The original `xml` datasets are extracted from here:
  `https://github.com/mananoreboton/en-es-en-Dic`
  *  However I had to clean the data and parse it again in JSON files
  *  You can track those changes in the `xml_to_json`, which not only turns them as dictionaries
  *  If also removes genders (`{f}, {m}`), plurals/singulars (`{p} {s}`) synonymous (`()...`) and it takes part from the result
  *  For example in one word translations it takes the first word, same in two words translations takes first two
  *  But in those longer than that, it takes the translation until the first comma, and considers the keys for that