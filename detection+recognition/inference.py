from typing import Coroutine
from definition import recognition as rec
from definition import detection as dec
import torch
import gc
import shutil   
from pathlib import Path
import cv2

#edit distance on each word with one or 2 edits away having max probability
from lang_modelling import correction
punctiation="""!"#&'*+,-./"""

def parseText(predictor, data):
    contents ={}
    for page, docs in data.items():
        imgname = docs['path']
        bboxes= docs['bboxes']
        img = cv2.imread(imgname)
        contents[page]=[]
        for i,bbox in enumerate(bboxes):
            x = bbox[0]
            y = bbox[1]

            crop = img[bbox[1]:bbox[3], bbox[0]:bbox[2], :]
            
            op = predictor(crop)

            if op not in punctiation:
                op = correction(op)

            contents[page].append(op)

    return contents
        
def getText(pdf_path):
    detector = dec.prepare_model()
    rector = rec.getEssential()

    bbox = dec.get_bboxes_for_pdf(pdf_path, detector)

    context = parseText(rector, bbox)

    for k, v in context.items():
        context[k] = ' '.join(v)
    
    ## cleanup
    path = Path(pdf_path[0]+'/images')
    shutil.rmtree(str(path))

    del detector
    del rector
    gc.collect()

    return context

