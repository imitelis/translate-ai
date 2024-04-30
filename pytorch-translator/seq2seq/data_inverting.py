# Open the file and read its contents
with open("../data/esp-eng.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

# Process each line and keep only the first two columns
modified_lines = []
for line in lines:
    columns = line.split('\t')
    first_col = columns[0].strip()
    second_col = columns[1].strip()
    modified_line = '\t'.join([second_col, first_col])
    modified_lines.append(modified_line)

# Write the modified lines back to the file
with open("../data/eng-esp.txt", "w", encoding="utf-8") as file:
    for modified_line in modified_lines:
        file.write(modified_line + "\n")