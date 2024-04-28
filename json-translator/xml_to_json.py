
import xml.etree.ElementTree as ET
import re
import json

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

        # Remove {f} and {m} from translation
        value = re.sub(r'\{[fm]\}', '', value)

        # Remove words inside parentheses using regex
        value = re.sub(r'\([^)]*\)', '', value)

        # Split translation by period and strip leading/trailing whitespace
        translation_parts = [part.strip() for part in value.split('.')]

        # Determine how many words are in the key
        key_words = key.split()
        if len(key_words) <= 1:
            if ',' in translation_parts[0]:
                # If there's a comma in the translation, take the first part
                translation = translation_parts[0].split(',')[0]
            else:
                # If there's no comma, keep the translation intact
                translation = ' '.join(translation_parts[0].split()[:2]) if translation_parts else ''
        elif len(key_words) <= 2:
            translation = ' '.join(translation_parts[0].split()[:2]) if translation_parts else ''
        else:
            translation = value.split(',')[0].strip()

        # Remove any remaining comma from the translation
        # translation = translation.replace(',', '')

        # Store translation in dictionary
        data_dict[key] = translation

# Write dictionary as JSON to a file
with open(f'{translate}.json', 'w') as json_file:
    json.dump(data_dict, json_file, indent=4)