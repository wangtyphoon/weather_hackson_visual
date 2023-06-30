import chardet

def detect_encoding(file_path):
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        return result['encoding']

file_path = '財報整理_前14項.csv'
encoding = detect_encoding(file_path)
print(encoding)