import csv
import codecs

def convert_big5_to_utf8(input_csv, output_csv):
    with open(input_csv, 'r', encoding='cp950') as f_input:
        reader = csv.reader(f_input)
        with codecs.open(output_csv, 'w', encoding='utf-8-sig') as f_output:
            writer = csv.writer(f_output)
            for row in reader:
                writer.writerow(row)

input_csv = '資料蒐集.csv'
output_csv = 'example-Carbon.csv'

convert_big5_to_utf8(input_csv, output_csv)

