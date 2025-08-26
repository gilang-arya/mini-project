binary = input("Input binary number (max. 8digit): ")
dec = 0
multiplier = 1

if not binary:
    print("No input given")
    exit()
else:
    for n in binary:
        if n not in ("0", "1"):
            print("Input must 1 or 0")
            exit()

for num in reversed(binary):
   if num == "1":
    dec += multiplier
   multiplier *= 2

print(dec)
