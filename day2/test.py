import chardet

def detect_csv_encoding(file_path):
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        encoding = result['encoding']
    return encoding

# 使用範例
csv_file_path = '台積電.csv'
encoding = detect_csv_encoding(csv_file_path)
print(f"CSV 編碼方式: {encoding}")
