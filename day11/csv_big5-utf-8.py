import csv
import codecs

def convert_big5_to_utf8(input_csv, output_csv):
    with open(input_csv, 'r', encoding='cp950') as f_input:
        reader = csv.reader(f_input)
        with codecs.open(output_csv, 'w', encoding='utf-8-sig') as f_output:
            writer = csv.writer(f_output)
            for row in reader:
                updated_row = [value if value != 'NaN' else 'nan' for value in row]
                writer.writerow(updated_row)

input_csv = 'csv\鴻海.csv'
output_csv = 'csv/2317.csv'

convert_big5_to_utf8(input_csv, output_csv)


