import numpy as np

class Tokenizer:
    def __init__(self, tokens,max_len):
        self.tokens = tokens
        self.SOS_token = 0
        self.EOS_token = 1
        self.UNKNOWN_token = len(tokens) + 2
        self.n_token = len(tokens) + 3
        self.max_len= max_len
        char_idx = {}

        for i, c in enumerate(tokens):
            char_idx[c] = i + 2

        self.char_idx = char_idx

    def tokenize(self, s):
        if len(s)>=self.max_len:
          s=s[:self.max_len]
        label = np.zeros((len(s) + 1,), dtype=np.long)
        label[0] = self.SOS_token

        for i, c in enumerate(s):
            
            label[i + 1] = self.char_idx.get(c, self.UNKNOWN_token)

        return label

    def translate(self, ts, n=None):
        ret = []

        if n is None:
            n = len(ts)

        for i in range(n):
            t = ts[i]

            if t == self.SOS_token:
                continue
            elif t == self.EOS_token:
                continue
            elif t == self.UNKNOWN_token:
                ret.append('?')
            else:
                ret.append(self.tokens[t - 2])

        return ''.join(ret)