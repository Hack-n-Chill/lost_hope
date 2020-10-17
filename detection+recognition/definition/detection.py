import os
import os
from pathlib import Path
from functools import cmp_to_key
import numpy as np
import cv2
import torch
import torchvision
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from torchvision.models.detection import FasterRCNN
from torchvision.models.detection.rpn import AnchorGenerator
import shutil
import json

from werkzeug.utils import secure_filename


# UPLOAD_FOLDER = ''
# # ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
MODEL_SAVE_PATH = 'models/detection.pth'

def prepare_model():
    model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=False)
    num_classes = 2  # 1 class (wheat) + background

    # get number of input features for the classifier
    in_features = model.roi_heads.box_predictor.cls_score.in_features

    # replace the pre-trained head with a new one
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)
    model.load_state_dict( torch.load( MODEL_SAVE_PATH, map_location=torch.device('cpu') ))
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    model.eval()
    return model

def get_bboxes_for_pdf( pdf_path , model ):
    def prepare( img_path ):
        img_path = str(img_path)
        image = cv2.imread( img_path , cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB).astype(np.float32)
        image /= 255.0
        image = torch.from_numpy(image.transpose(2, 0, 1))
        # image = image.cuda()
        image = [ image ]
        return image


    path = Path(pdf_path[0]+'/images')
    os.makedirs( path , exist_ok=True)
 
    # if process returns anything except 0 -> failed execution
    if os.system("python pdfprocess.py -p {}".format( '/'.join(pdf_path) )):
        raise RuntimeError('program {} failed!'.format('pdfprocess.py'))
    
    image_paths = list( path.iterdir())
    
    images = [prepare(img) for img in image_paths]

    bbox ={}
    # model = model.cuda()
    def cmp( box1 , box2 ):
        if box1[0] == box2[0]:
            return box1[1] - box2[1]
        return box1[0] - box2[0]
    
    for i , img in enumerate(images):
        outputs = model(img)
        boxes = outputs[0]['boxes'].data.cpu().numpy()
        scores = outputs[0]['scores'].data.cpu().numpy()
        detection_threshold = 0.4 # threshold to reject ill formed bboxes
        boxes = boxes[scores >= detection_threshold].astype(np.int32)
        boxes = sorted( boxes , key = cmp_to_key(cmp))
        bbox['page_{}'.format(i+1)] = {
            'path' : str(image_paths[i]),
            'bboxes': [ a.tolist() for a in boxes]
        }
    
    return bbox
