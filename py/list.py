# coding=utf-8

import os

script_file = os.path.basename(__file__)  # 獲取當前腳本的文件名

p = input("請輸入要過濾的字串: ")
while p == "":
    p = input("請輸入要過濾的字串: ")

yn = input("是否將輸出存儲到 out[{}].txt (y/n): ".format(p))

while yn.lower() not in ["y", "n"]:
    yn = input("是否將輸出存儲到 out[{}].txt (y/n): ".format(p))

if yn.lower() == "y":
    with open("out[{}].txt".format(p), "w", encoding="utf-8") as f:
        files = [filename for filename in os.listdir() if p in filename and filename != script_file and os.path.isfile(filename) and filename != "out[{}].txt".format(p)]
        for file in files:
            f.write(file + "\n")
else:
    files = [filename for filename in os.listdir() if p in filename and filename != script_file and os.path.isfile(filename) and filename != "out[{}].txt".format(p)]
    for file in files:
        print(file)

print("處理結束，按 Enter 鍵退出: ")
input()