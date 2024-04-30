
import re
import json
import xml.etree.ElementTree as ET

translate = "en-es"

tree = ET.parse(f'{translate}.xml')
root = tree.getroot()

# Convert XML to dictionary
data_dict = {}
for w in root.findall('./l/w'):
    key = w.find('c').text
    value_element = w.find('d')

    # Check if the <d> tag exists and is not empty
    if value_element is not None and value_element.text:
        value = value_element.text

        # Remove last comma (if present)
        value = re.sub(r',\s*$', '', value)

        # Remove {p}, {s} {f} and {m} from translation
        value = re.sub(r'\{[psfm]\}', '', value)

        # Remove words inside parentheses or brackets using regex
        value = re.sub(r'\([^)]*\)', '', value)
        value = re.sub(r'\[[^)]*\]', '', value)

        # Split translation by period and strip leading/trailing whitespace
        translation_parts = [part.strip() for part in value.split('.')]

        # Determine how many words are in the key
        key_words = key.split()
        if len(key_words) <= 2:
            if ';' in translation_parts[0]:
                # If there's a semicolon in the translation, take the first part
                translation = translation_parts[0].split(';', 1)[0]
            elif ',' in translation_parts[0]:
                # If there's a comma in the translation, take the first part
                translation = translation_parts[0].split(',', 1)[0]
            elif ':' in translation_parts[0]:
                # If there's a colon in the translation, take the first part
                translation = translation_parts[0].split(':', 1)[0]     
            elif '.' in translation_parts[0]:
                # If there's a point in the translation, take the first part
                translation = translation_parts[0].split('.', 1)[0]
            else:
                # If there's no previous symbols, keep the translation intact
                translation = ' '.join(translation_parts[0].split()[:2]) if translation_parts else ''
        else:
            part = re.split('[;,:.]', value)
            translation = part[0].strip()

        # Store translation in dictionary
        data_dict[key] = translation.strip()

# Write dictionary as JSON to a file
with open(f'{translate}.json', 'w') as json_file:
    json.dump(data_dict, json_file, indent=4)