from ctypes import *

dec = cdll.LoadLibrary('./decontraction.so')

status = dec.Decontraction()

print(status)