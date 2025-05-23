# IDA安装


<!--more-->

## 下载
[https://my.hex-rays.com/dashboard/download-center/downloads](https://my.hex-rays.com/dashboard/download-center/downloads)

## Win版
1. 编辑许可证信息，注意到期时间不要超过10年
2. 将ida/ida64 dll/so/dylib放在与script相同的目录下
3. 运行脚本生成license
4. 复制生成的license，并将dll替换为补丁
5. 运行激活

## Mac版
1. 将所需破解文件与脚本放置于同一目录并运行
**于下面路径中寻找libida64.dylib与libida.dylib文件:**
```txt
/Applications/IDA Professional 9.0.app/Contents/MacOS
```
**将两个文件复制并置于CRACK同一目录并运行,运行script后，获取生成的.dylib文件**

2. 去掉文件后缀
**将生成的.dylib.patch文件的.patch后缀去掉，保留为.dylib**

3. 文件放置
**将修改后的.dylib文件与ida.hexlic文件放置在以下目录中:**
```txt
/Applications/IDA Professional 9.0.app/Contents/MacOS
```

4. 文件签名
**对放置在上述目录中的.dylib文件依次进行签名，参考以下命令:**
```bash
sudo codesign --force --deep --sign - /Applications/IDA\ Professional\ 9.0.app/Contents/MacOS/libida64.dylib
sudo codesign --force --deep --sign - /Applications/IDA\ Professional\ 9.0.app/Contents/MacOS/libida.dylib
```

5. 确认签名成功
**删除 /Applications/IDA Professional 9.0.app/Contents/MacOS/plugins/arm_mac_user64.dylib**


## 配置

```Python
import json
import hashlib
import os

license = {
    "header": {"version": 1},
    "payload": {
        "name": "meow :3",
        "email": "hi@hex-rays.com",
        "licenses": [
            {
                "id": "48-2137-ACAB-99",
                "license_type": "named",
                "product": "IDA",
                "seats": 1,
                "start_date": "2024-08-10 00:00:00",
                "end_date": "2033-12-31 23:59:59",  # This can't be more than 10 years!
                "issued_on": "2024-08-10 00:00:00",
                "owner": "cracked by alula :3",
                "add_ons": [
                    # {
                    #     "id": "48-1337-DEAD-01",
                    #     "code": "HEXX86L",
                    #     "owner": "48-0000-0000-00",
                    #     "start_date": "2024-08-10 00:00:00",
                    #     "end_date": "2033-12-31 23:59:59",
                    # },
                    # {
                    #     "id": "48-1337-DEAD-02",
                    #     "code": "HEXX64L",
                    #     "owner": "48-0000-0000-00",
                    #     "start_date": "2024-08-10 00:00:00",
                    #     "end_date": "2033-12-31 23:59:59",
                    # },
                ],
                "features": [],
            }
        ],
    },
}

def add_every_addon(license):
    platforms = [
        "W",  # Windows
        "L",  # Linux
        "M",  # macOS
    ]
    addons = [
        "HEXX86",
        "HEXX64",
        "HEXARM",
        "HEXARM64",
        "HEXMIPS",
        "HEXMIPS64",
        "HEXPPC",
        "HEXPPC64",
        "HEXRV64",
        "HEXARC",
        "HEXARC64",
        # Probably cloud?
        # "HEXCX86",
        # "HEXCX64",
        # "HEXCARM",
        # "HEXCARM64",
        # "HEXCMIPS",
        # "HEXCMIPS64",
        # "HEXCPPC",
        # "HEXCPPC64",
        # "HEXCRV",
        # "HEXCRV64",
        # "HEXCARC",
        # "HEXCARC64",
    ]

    i = 0
    for addon in addons:
        i += 1
        license["payload"]["licenses"][0]["add_ons"].append(
            {
                "id": f"48-1337-DEAD-{i:02}",
                "code": addon,
                "owner": license["payload"]["licenses"][0]["id"],
                "start_date": "2024-08-10 00:00:00",
                "end_date": "2033-12-31 23:59:59",
            }
        )
    # for addon in addons:
    #     for platform in platforms:
    #         i += 1
    #         license["payload"]["licenses"][0]["add_ons"].append(
    #             {
    #                 "id": f"48-1337-DEAD-{i:02}",
    #                 "code": addon + platform,
    #                 "owner": license["payload"]["licenses"][0]["id"],
    #                 "start_date": "2024-08-10 00:00:00",
    #                 "end_date": "2033-12-31 23:59:59",
    #             }
    #         )

add_every_addon(license)

def json_stringify_alphabetical(obj):
    return json.dumps(obj, sort_keys=True, separators=(",", ":"))

def buf_to_bigint(buf):
    return int.from_bytes(buf, byteorder="little")

def bigint_to_buf(i):
    return i.to_bytes((i.bit_length() + 7) // 8, byteorder="little")

# Yup, you only have to patch 5c -> cb in libida64.so
pub_modulus_hexrays = buf_to_bigint(
    bytes.fromhex(
        "edfd425cf978546e8911225884436c57140525650bcf6ebfe80edbc5fb1de68f4c66c29cb22eb668788afcb0abbb718044584b810f8970cddf227385f75d5dddd91d4f18937a08aa83b28c49d12dc92e7505bb38809e91bd0fbd2f2e6ab1d2e33c0c55d5bddd478ee8bf845fcef3c82b9d2929ecb71f4d1b3db96e3a8e7aaf93"
    )
)
pub_modulus_patched = buf_to_bigint(
    bytes.fromhex(
        "edfd42cbf978546e8911225884436c57140525650bcf6ebfe80edbc5fb1de68f4c66c29cb22eb668788afcb0abbb718044584b810f8970cddf227385f75d5dddd91d4f18937a08aa83b28c49d12dc92e7505bb38809e91bd0fbd2f2e6ab1d2e33c0c55d5bddd478ee8bf845fcef3c82b9d2929ecb71f4d1b3db96e3a8e7aaf93"
    )
)

private_key = buf_to_bigint(
    bytes.fromhex(
        "77c86abbb7f3bb134436797b68ff47beb1a5457816608dbfb72641814dd464dd640d711d5732d3017a1c4e63d835822f00a4eab619a2c4791cf33f9f57f9c2ae4d9eed9981e79ac9b8f8a411f68f25b9f0c05d04d11e22a3a0d8d4672b56a61f1532282ff4e4e74759e832b70e98b9d102d07e9fb9ba8d15810b144970029874"
    )
)

def decrypt(message):
    decrypted = pow(buf_to_bigint(message), exponent, pub_modulus_patched)
    decrypted = bigint_to_buf(decrypted)
    return decrypted[::-1]

def encrypt(message):
    encrypted = pow(buf_to_bigint(message[::-1]), private_key, pub_modulus_patched)
    encrypted = bigint_to_buf(encrypted)
    return encrypted

exponent = 0x13

def sign_hexlic(payload: dict) -> str:
    data = {"payload": payload}
    data_str = json_stringify_alphabetical(data)

    buffer = bytearray(128)
    # first 33 bytes are random
    for i in range(33):
        buffer[i] = 0x42

    # compute sha256 of the data
    sha256 = hashlib.sha256()
    sha256.update(data_str.encode())
    digest = sha256.digest()

    # copy the sha256 digest to the buffer
    for i in range(32):
        buffer[33 + i] = digest[i]

    # encrypt the buffer
    encrypted = encrypt(buffer)

    return encrypted.hex().upper()

def generate_patched_dll(filename):
    if not os.path.exists(filename):
        print(f"Didn't find {filename}, skipping patch generation")
        return

    with open(filename, "rb") as f:
        data = f.read()

        if data.find(bytes.fromhex("EDFD42CBF978")) != -1:
            print(f"{filename} looks to be already patched :)")
            return

        if data.find(bytes.fromhex("EDFD425CF978")) == -1:
            print(f"{filename} doesn't contain the original modulus.")
            return

        data = data.replace(
            bytes.fromhex("EDFD425CF978"), bytes.fromhex("EDFD42CBF978")
        )

        patched_filename = f"{filename}.patched"
        with open(patched_filename, "wb") as f:
            f.write(data)

        print(f"Generated modulus patch to {patched_filename}! To apply the patch, replace the original file with the patched file")

# message = bytes.fromhex(license["signature"])
# print(decrypt(message).hex())
# print(encrypt(decrypt(message)).hex())

license["signature"] = sign_hexlic(license["payload"])

serialized = json_stringify_alphabetical(license)

# write to ida.hexlic
filename = "ida.hexlic"

with open(filename, "w") as f:
    f.write(serialized)

print(f"Saved new license to {filename}!")

generate_patched_dll("ida.dll")
generate_patched_dll("ida64.dll")
generate_patched_dll("libida.so")
generate_patched_dll("libida64.so")
generate_patched_dll("libida.dylib")
generate_patched_dll("libida64.dylib")
```
